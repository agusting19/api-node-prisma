import Joi from "joi";

const createValidator = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  categoryId: Joi.number().required(),
  stock: Joi.number().required(),
});

const updateValidator = Joi.object({
  name: Joi.string(),
  price: Joi.number(),
  categoryId: Joi.number(),
  stock: Joi.number(),
});

export const validateCreateProduct = (req, res, next) => {
  const { error } = createValidator.validate(req.body);

  if (error) return res.status(400).json({ error: error.message });

  next();
};

export const validateUpdateProduct = (req, res, next) => {
  const { error } = updateValidator.validate(req.body);

  if (error) return res.status(400).json({ error: error.message });

  next();
};
