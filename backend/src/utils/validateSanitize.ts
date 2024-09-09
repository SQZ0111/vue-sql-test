const Joi = require("joi");

const schemaBlog = Joi.object({
  user_name: Joi.string().alphanum().min(3).max(30).required(),
  title: Joi.string().alphanum().min(0).max(30).required(),
  content: Joi.string().alphanum().required(),
});

export function validateBlog(requestObject: Record<string, string>): string {
  const { error, value } = schemaBlog.validate(requestObject);
  if (error) {
    return error.details[0].message;
  }
  return "ok";
}
