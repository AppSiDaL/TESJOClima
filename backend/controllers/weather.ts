import { type Response, type Request } from 'express'
import { type SQLTesjoResponse, type landingProps } from '../types'
import {
  calculateRainProbability,
  determineWeatherState,
  getSunsetSunrise
} from '../utils/weather'
import { Op } from 'sequelize'
import aqiService from '../services/aqiService'
const weatherRouter = require('express').Router()
const { Weather, Prediction } = require('../models')
const moment = require('moment-timezone')

weatherRouter.get('/bridge', async (_req: Request, res: Response) => {
  try {
    const tokenUrl = 'https://eu-central.aws.thinger.io:443/oauth/token'
    const tokenHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const tokenData =
      'grant_type=password&username=Rubes&password=Meca.TESJo01'

    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: tokenHeaders,
      body: tokenData
    })

    if (!tokenResponse.ok) {
      throw new Error(
        `Error en la solicitud: ${tokenResponse.status} - ${tokenResponse.statusText}`
      )
    }

    const tokenInfo = await tokenResponse.json()
    const token = tokenInfo.access_token

    const dataBucketUrl =
      'https://eu-central.aws.thinger.io:443/v1/users/Rubes/buckets/Variables_Meteorologicas/data'
    const dataHeaders = {
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    }

    const dataResponse = await fetch(dataBucketUrl, {
      method: 'GET',
      headers: dataHeaders
    })

    if (!dataResponse.ok) {
      throw new Error(
        `Error en la solicitud de datos: ${dataResponse.status} - ${dataResponse.statusText}`
      )
    }
    console.log(dataResponse)

    const data = await dataResponse.json()

    const newDataArray = data.map((item: any) => {
      const date = moment(item.ts).tz('America/Mexico_City')
      const day = date.date()
      const month = date.month() + 1
      const year = date.year()
      return {
        timestamp: item.ts,
        fecha: `${year}-${month}-${day}`,
        hora: date.hours(),
        minuto: date.minutes(),
        direccion: item.val.DIRECCION,
        humedad: item.val.HUMEDAD,
        lluvia: item.val.LLUVIA,
        luz: item.val.LUZ,
        presion: item.val.PRESION,
        temperatura: item.val.TEMPERATURA,
        velocidad: item.val.VELOCIDAD
      }
    })

    const insertedData = await Weather.bulkCreate(newDataArray, {
      ignoreDuplicates: true
    })
    res.status(201).json({ inserted: insertedData.length })
  } catch (error) {
    console.error(error)
  }
})

weatherRouter.get('/', async (_req: Request, res: Response) => {
  res.send('TESJo Clima API ----- Developed by AppSiDaL')
})

weatherRouter.get('/landing', async (_req: Request, res: Response) => {
  const currentHour = moment().tz('America/Mexico_City').hour()
  const currentDate = moment().tz('America/Mexico_City').startOf('day')
  const nextDate = moment(currentDate).add(1, 'day')
  const secondNextDate = moment(currentDate).add(2, 'day')

  const actualValue: SQLTesjoResponse = await Weather.findOne({
    order: [['timestamp', 'DESC']]
  })

  const restOfDayPredictions: SQLTesjoResponse[] = await Prediction.findAll({
    where: {
      fecha: {
        [Op.eq]: currentDate.toISOString()
      },
      hora: {
        [Op.gte]: currentHour
      }
    },
    limit: (24 - currentHour) * 60,
    order: [['timestamp', 'ASC']]
  })

  const nextDayPredictions: SQLTesjoResponse[] = await Prediction.findAll({
    where: {
      fecha: {
        [Op.eq]: nextDate.toISOString()
      }
    },
    limit: 24 * 60,
    order: [['timestamp', 'ASC']]
  })

  const secondNextDayPredictions: SQLTesjoResponse[] = await Prediction.findAll(
    {
      where: {
        fecha: {
          [Op.eq]: secondNextDate.toISOString()
        },
        hora: {
          [Op.lt]: currentHour
        }
      },
      limit: currentHour * 60,
      order: [['timestamp', 'ASC']]
    }
  )

  const next48PredictionFirst = restOfDayPredictions.filter(
    (_, index) => index % 60 === 0
  )
  const next48PredictionsSecond = nextDayPredictions.filter(
    (_, index) => index % 60 === 0
  )
  const next48PredictionsThird = secondNextDayPredictions.filter(
    (_, index) => index % 60 === 0
  )

  const next48HoursPredictions = [
    ...next48PredictionFirst,
    ...next48PredictionsSecond,
    ...next48PredictionsThird
  ]

  const actual = {
    hora: actualValue.dataValues.hora,
    date: actualValue.dataValues.fecha,
    temperatura: actualValue.dataValues.temperatura,
    estado_tiempo: determineWeatherState(actualValue.dataValues),
    porcentaje_lluvia: calculateRainProbability(actualValue.dataValues),
    confort: [
      { name: 'humedad', value: actualValue.dataValues.humedad },
      { name: 'lluvia', value: actualValue.dataValues.lluvia },
      { name: 'luz', value: actualValue.dataValues.luz },
      { name: 'presion', value: actualValue.dataValues.presion },
      { name: 'viento', value: actualValue.dataValues.velocidad },
      { name: 'direccion', value: actualValue.dataValues.direccion }
    ]
  }

  const next48 = next48HoursPredictions.map((value) => ({
    hora: value.dataValues.hora,
    date: value.dataValues.fecha,
    temperatura: value.dataValues.temperatura,
    velocidad_viento: value.dataValues.velocidad,
    direccion_viento: value.dataValues.direccion,
    estado_tiempo: determineWeatherState(value.dataValues),
    porcentaje_lluvia: calculateRainProbability(value.dataValues),
    confort: [
      { name: 'humedad', value: value.dataValues.humedad },
      { name: 'lluvia', value: value.dataValues.lluvia },
      { name: 'luz', value: value.dataValues.luz },
      { name: 'presion', value: value.dataValues.presion },
      { name: 'viento', value: value.dataValues.velocidad },
      { name: 'direccion', value: value.dataValues.direccion }
    ]
  }))
  const dates = []
  for (let i = 0; i < 7; i++) {
    const date = moment().tz('America/Mexico_City').startOf('day').add(i, 'days')
    dates.push(date)
  }

  const week = []
  for (const date of dates) {
    const forecasts = await Prediction.findAll({
      where: {
        fecha: {
          [Op.between]: [
            date.startOf('day').toISOString(),
            date.endOf('day').toISOString()
          ]
        }
      },
      order: [['timestamp', 'DESC']]
    })

    if (forecasts.length > 0) {
      const minTemp = forecasts.reduce(
        (min: any, p: any) =>
          p.dataValues.temperatura < min ? p.dataValues.temperatura : min,
        forecasts[0].dataValues.temperatura
      )
      const maxTemp = forecasts.reduce(
        (max: any, p: any) =>
          p.dataValues.temperatura > max ? p.dataValues.temperatura : max,
        forecasts[0].dataValues.temperatura
      )

      week.push({
        dia: date.format('dddd'),
        fecha: date.format('YYYY-MM-DD'),
        pronostico: determineWeatherState(forecasts[0].dataValues),
        porcentaje_lluvia: calculateRainProbability(forecasts[0].dataValues),
        velocidad_viento: forecasts[0].dataValues.velocidad,
        direccion_viento: forecasts[0].dataValues.direccion,
        temperatura_minima: minTemp,
        temperatura_maxima: maxTemp
      })
    }
  }

  const response: landingProps = {
    actual,
    next48,
    week
  }
  res.status(200).json(response)
})

weatherRouter.get('/now', async (_req: Request, res: Response) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const moments = {
      madrugada: { start: 0, end: 6 },
      mañana: { start: 6, end: 12 },
      tarde: { start: 12, end: 18 },
      noche: { start: 18, end: 23 }
    }

    const formattedPronostics = []
    for (const moment in moments) {
      const start = new Date(today)
      start.setHours(moments[moment as keyof typeof moments].start, 0, 0, 0)
      const end = new Date(today)
      end.setHours(moments[moment as keyof typeof moments].end, 0, 0, 0)

      let pronostic
      if (new Date() < end) {
        pronostic = await Prediction.findOne({
          where: {
            fecha: {
              [Op.between]: [start, end]
            },
            hora: {
              [Op.between]: [start.getHours(), end.getHours()]
            }
          },
          order: [['fecha', 'DESC']]
        })
      } else {
        pronostic = await Weather.findOne({
          where: {
            fecha: {
              [Op.between]: [start, end]
            },
            hora: {
              [Op.between]: [start.getHours(), end.getHours()]
            }
          },
          order: [['fecha', 'DESC']]
        })
      }
      if (pronostic) {
        formattedPronostics.push({
          momento: moment,
          fecha: pronostic.dataValues.fecha,
          temperatura: pronostic.dataValues.temperatura,
          tiempo: determineWeatherState(pronostic.dataValues),
          probabilidad_de_lluvia: calculateRainProbability(
            pronostic.dataValues
          )
        })
      }
    }
    const todayPronostic = await Weather.findOne({
      order: [['timestamp', 'DESC']]
    })
    const airQuality = await aqiService.getAirQuality()
    const todayPronosticFormatted = {
      hora: todayPronostic.dataValues.hora,
      date: todayPronostic.dataValues.fecha,
      tempeture: todayPronostic.dataValues.temperatura,
      airQuality,
      sunrise: getSunsetSunrise().sunrise,
      sunset: getSunsetSunrise().sunset,
      estado_tiempo: determineWeatherState(todayPronostic.dataValues),
      porcentaje_lluvia: calculateRainProbability(todayPronostic.dataValues),
      confort: [
        { name: 'humedad', value: todayPronostic.dataValues.humedad },
        { name: 'lluvia', value: todayPronostic.dataValues.lluvia },
        { name: 'luz', value: todayPronostic.dataValues.luz },
        { name: 'presion', value: todayPronostic.dataValues.presion },
        { name: 'viento', value: todayPronostic.dataValues.velocidad },
        { name: 'direccion', value: todayPronostic.dataValues.direccion }
      ]
    }

    const currentHour = new Date().getHours()

    const hours = [
      currentHour + 1,
      currentHour + 2,
      currentHour + 3,
      currentHour + 4
    ]

    const hourPronostics = []
    for (const hour of hours) {
      const nextHour = hour + 1

      const pronostic = await Prediction.findOne({
        where: {
          fecha: new Date(),
          hora: {
            [Op.gte]: hour,
            [Op.lt]: nextHour
          }
        },
        order: [
          ['fecha', 'DESC'],
          ['hora', 'DESC'],
          ['minuto', 'DESC']
        ]
      })

      if (pronostic) {
        hourPronostics.push({
          momento: `${hour}:00`,
          fecha: pronostic.dataValues.fecha,
          temperatura: pronostic.dataValues.temperatura,
          tiempo: determineWeatherState(pronostic.dataValues),
          probabilidad_de_lluvia: calculateRainProbability(
            pronostic.dataValues
          )
        })
      }
    }

    const currentDate = new Date()

    const days = [1, 2, 3, 4, 5]

    const dialyPronostics = []
    for (const day of days) {
      const start = new Date(currentDate)
      start.setDate(currentDate.getDate() + day)
      start.setHours(0, 0, 0, 0)
      const end = new Date(currentDate)
      end.setDate(currentDate.getDate() + day)
      end.setHours(23, 59, 59, 999)

      const pronostic = await Prediction.findOne({
        where: {
          fecha: {
            [Op.between]: [start, end]
          }
        },
        order: [['fecha', 'DESC']]
      })

      if (pronostic) {
        dialyPronostics.push({
          momento: `${start.getDate()}/${
            start.getMonth() + 1
          }/${start.getFullYear()}`,
          temperatura: pronostic.dataValues.temperatura,
          tiempo: determineWeatherState(pronostic.dataValues),
          probabilidad_de_lluvia: calculateRainProbability(
            pronostic.dataValues
          )
        })
      }
    }

    const response = {
      todayPronostic: formattedPronostics,
      confortValues: todayPronosticFormatted,
      hourPronostic: hourPronostics,
      dialyPronostics
    }

    res.status(200).json(response)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the pronostics.' })
  }
})

weatherRouter.get('/hours', async (_req: Request, res: Response) => {
  const currentHour = moment().tz('America/Mexico_City').hour()
  const currentDate = moment().tz('America/Mexico_City').startOf('day')
  const nextDate = moment(currentDate).add(1, 'day')
  const secondNextDate = moment(currentDate).add(2, 'day')

  const restOfDayPredictions: SQLTesjoResponse[] = await Prediction.findAll({
    where: {
      fecha: {
        [Op.eq]: currentDate.toISOString()
      },
      hora: {
        [Op.gte]: currentHour
      }
    },
    limit: (24 - currentHour) * 60,
    order: [['timestamp', 'ASC']]
  })

  const nextDayPredictions: SQLTesjoResponse[] = await Prediction.findAll({
    where: {
      fecha: {
        [Op.eq]: nextDate.toISOString()
      }
    },
    limit: 24 * 60,
    order: [['timestamp', 'ASC']]
  })

  const secondNextDayPredictions: SQLTesjoResponse[] = await Prediction.findAll(
    {
      where: {
        fecha: {
          [Op.eq]: secondNextDate.toISOString()
        },
        hora: {
          [Op.lt]: currentHour
        }
      },
      limit: currentHour * 60,
      order: [['timestamp', 'ASC']]
    }
  )

  const next48PredictionFirst = restOfDayPredictions.filter(
    (_, index) => index % 60 === 0
  )
  const next48PredictionsSecond = nextDayPredictions.filter(
    (_, index) => index % 60 === 0
  )
  const next48PredictionsThird = secondNextDayPredictions.filter(
    (_, index) => index % 60 === 0
  )

  const next48HoursPredictions = [
    ...next48PredictionFirst,
    ...next48PredictionsSecond,
    ...next48PredictionsThird
  ]

  const next48 = next48HoursPredictions.map((value) => ({
    hora: value.dataValues.hora,
    date: value.dataValues.fecha,
    temperatura: value.dataValues.temperatura,
    estado_tiempo: determineWeatherState(value.dataValues),
    porcentaje_lluvia: calculateRainProbability(value.dataValues),
    velocidad_viento: value.dataValues.velocidad,
    direccion_viento: value.dataValues.direccion,
    humedad: value.dataValues.humedad,
    luz: value.dataValues.luz,
    presion: value.dataValues.presion,
    lluvia: value.dataValues.lluvia
  }))

  res.status(200).json(next48)
})

weatherRouter.get(
  '/forecast/:timestamp',
  async (req: Request, res: Response) => {
    const timestamp: number = Number(req.params.timestamp)
    if (!Number.isFinite(+timestamp)) {
      console.log('Timestamp inválido:', timestamp)
      return
    }
    const dateObject = new Date(+timestamp) // Convertir el timestamp a un objeto Date
    const currentHour = moment(dateObject).tz('America/Mexico_City').hour()
    const currentDate = moment(dateObject)
      .tz('America/Mexico_City')
      .startOf('day')
    const nextDate = moment(currentDate).add(1, 'day')
    const secondNextDate = moment(currentDate).add(2, 'day')

    const beforeTimestamp: any = await Weather.findOne({
      where: {
        timestamp: {
          [Op.lte]: timestamp // Menor o igual al timestamp
        }
      },
      order: [['timestamp', 'DESC']]
    })

    const afterTimestamp: any = await Weather.findOne({
      where: {
        timestamp: {
          [Op.gte]: timestamp // Mayor o igual al timestamp
        }
      },
      order: [['timestamp', 'ASC']]
    })

    let actualValue: any
    if (beforeTimestamp && afterTimestamp) {
      // Si ambos existen, elige el más cercano al timestamp
      actualValue =
        Math.abs(beforeTimestamp.timestamp - timestamp) <
        Math.abs(afterTimestamp.timestamp - timestamp)
          ? beforeTimestamp
          : afterTimestamp
    } else if (beforeTimestamp) {
      // Si solo existe beforeTimestamp, elige ese
      actualValue = beforeTimestamp
    } else if (afterTimestamp) {
      // Si solo existe afterTimestamp, elige ese
      actualValue = afterTimestamp
    } else {
      // Si ninguno existe, actualValue será undefined
    }

    const restOfDayPredictions: SQLTesjoResponse[] = await Prediction.findAll({
      where: {
        fecha: {
          [Op.eq]: currentDate.toISOString()
        },
        hora: {
          [Op.gte]: currentHour
        }
      },
      limit: (24 - currentHour) * 60,
      order: [['timestamp', 'ASC']]
    })

    const nextDayPredictions: SQLTesjoResponse[] = await Prediction.findAll({
      where: {
        fecha: {
          [Op.eq]: nextDate.toISOString()
        }
      },
      limit: 24 * 60,
      order: [['timestamp', 'ASC']]
    })

    const secondNextDayPredictions: SQLTesjoResponse[] =
      await Prediction.findAll({
        where: {
          fecha: {
            [Op.eq]: secondNextDate.toISOString()
          },
          hora: {
            [Op.lt]: currentHour
          }
        },
        limit: currentHour * 60,
        order: [['timestamp', 'ASC']]
      })

    const next48PredictionFirst = restOfDayPredictions.filter(
      (_, index) => index % 60 === 0
    )
    const next48PredictionsSecond = nextDayPredictions.filter(
      (_, index) => index % 60 === 0
    )
    const next48PredictionsThird = secondNextDayPredictions.filter(
      (_, index) => index % 60 === 0
    )

    const next48HoursPredictions = [
      ...next48PredictionFirst,
      ...next48PredictionsSecond,
      ...next48PredictionsThird
    ]

    const actual = {
      hora: actualValue.dataValues.hora,
      date: actualValue.dataValues.fecha,
      temperatura: actualValue.dataValues.temperatura,
      estado_tiempo: determineWeatherState(actualValue.dataValues),
      porcentaje_lluvia: calculateRainProbability(actualValue.dataValues),
      confort: [
        { name: 'humedad', value: actualValue.dataValues.humedad },
        { name: 'lluvia', value: actualValue.dataValues.lluvia },
        { name: 'luz', value: actualValue.dataValues.luz },
        { name: 'presion', value: actualValue.dataValues.presion },
        { name: 'viento', value: actualValue.dataValues.velocidad },
        { name: 'direccion', value: actualValue.dataValues.direccion }
      ]
    }

    const next48 = next48HoursPredictions.map((value) => ({
      hora: value.dataValues.hora,
      date: value.dataValues.fecha,
      temperatura: value.dataValues.temperatura,
      velocidad_viento: value.dataValues.velocidad,
      direccion_viento: value.dataValues.direccion,
      estado_tiempo: determineWeatherState(value.dataValues),
      porcentaje_lluvia: calculateRainProbability(value.dataValues),
      confort: [
        { name: 'humedad', value: value.dataValues.humedad },
        { name: 'lluvia', value: value.dataValues.lluvia },
        { name: 'luz', value: value.dataValues.luz },
        { name: 'presion', value: value.dataValues.presion },
        { name: 'viento', value: value.dataValues.velocidad },
        { name: 'direccion', value: value.dataValues.direccion }
      ]
    }))
    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = moment(timestamp)
        .tz('America/Mexico_City')
        .startOf('day')
        .add(i, 'days')
      dates.push(date)
    }

    const week = []
    for (const date of dates) {
      const forecasts = await Prediction.findAll({
        where: {
          fecha: {
            [Op.between]: [
              date.startOf('day').toISOString(),
              date.endOf('day').toISOString()
            ]
          }
        },
        order: [['timestamp', 'DESC']]
      })

      if (forecasts.length > 0) {
        const minTemp = forecasts.reduce(
          (min: any, p: any) =>
            p.dataValues.temperatura < min ? p.dataValues.temperatura : min,
          forecasts[0].dataValues.temperatura
        )
        const maxTemp = forecasts.reduce(
          (max: any, p: any) =>
            p.dataValues.temperatura > max ? p.dataValues.temperatura : max,
          forecasts[0].dataValues.temperatura
        )

        week.push({
          dia: date.format('dddd'),
          fecha: date.format('YYYY-MM-DD'),
          pronostico: determineWeatherState(forecasts[0].dataValues),
          porcentaje_lluvia: calculateRainProbability(forecasts[0].dataValues),
          velocidad_viento: forecasts[0].dataValues.velocidad,
          direccion_viento: forecasts[0].dataValues.direccion,
          temperatura_minima: minTemp,
          temperatura_maxima: maxTemp
        })
      }
    }

    const response: landingProps = {
      actual,
      next48,
      week
    }
    res.status(200).json(response)
  }
)

module.exports = weatherRouter
