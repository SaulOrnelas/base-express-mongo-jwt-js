import { response } from "express";

export const isAdminRole = (req, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "It's necessary validate token before",
    })
  }

  const { role, name } = req.user

  if (role !== 'ADMIN') {
    return res.status(401).json({
      msg: `${name} doesn't have privileges`,
    })
  }

  next()
}

export const hasRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "It's necessary validate token before",
      })
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(401).json({
        msg: `Service requires one of these roles ${roles}`,
      })
    }

    next()
  }
}