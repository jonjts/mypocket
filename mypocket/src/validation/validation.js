import validate from 'validate.js'
import moment from "moment";


export default function validation(fields, rules) {

  validate.extend(validate.validators.datetime, {
    // The value is guaranteed not to be null or undefined but otherwise it
    // could be anything.
    parse: function(value, options) {
      return +moment.utc(value);
    },
    // Input is a unix timestamp
    format: function(value, options) {
      var format = options.dateOnly ? "DD/MM/YYYY" : "DD/MM/YYYY hh:mm:ss";
      return moment.utc(value).format(format);
    }
  });
 
  const result = validate(fields, rules, {fullMessages: false})

  // If there is an error message, return it!
  if (result) {
    // Return only the field error message if there are multiple
    return result
  }

  return null
}
