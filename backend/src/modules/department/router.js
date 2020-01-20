import { Router } from 'express'
import { checkSchema, validationResult } from 'express-validator'

import Controller from './controller'

const router = Router()

router.post('/create', checkSchema({
  name: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No name provided',
    },
  },
  description: {
    in: 'body',
  },
  leaderID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Incorrect leader id provided',
    },
    notEmpty: {
      errorMessage: 'No leader provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const result = await Controller.create(req.body)

  return res.json(result)
})

router.post('/edit', checkSchema({
  id: {
    in: 'body',
    notEmpty: {
      errorMessage: 'No department id provided',
    },
    isNumeric: {
      errorMessage: 'Invalid department id provided',
    },
  },
  name: {
    in: 'body',
    isString: {
      errorMessage: 'Invalid department name provided',
    },
    notEmpty: {
      errorMessage: 'No department name provided',
    },
  },
  description: {
    in: 'body',
    optional: true,
  },
  leaderID: {
    in: 'body',
    isNumeric: {
      errorMessage: 'Invalid leader id provided',
    },
    notEmpty: {
      errorMessage: 'No leader id provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const result = await Controller.edit(req.body)

  return res.json(result)
})

router.post('/get', checkSchema({
  departmentID: {
    in: 'body',
    isInt: {
      errorMessage: 'Invalid department id provided',
      options: { min: 1 },
    },
    notEmpty: {
      errorMessage: 'No department id provided',
    },
  },
}), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }

  const department = await Controller.get(req.body)

  return res.json(department)
})

router.post('/getAll', async (req, res) => {
  const departments = await Controller.getAll()

  return res.json(departments)
})

export default router
