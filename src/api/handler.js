import httpFetch from './http';
/**
 * @todo This should move to utilities
 *
 * @param {String} endpoint - The name of the endpoint on the Api object
 * @param {any} data - The parameter to be passed to endpoint. Can be of any interface
 * @param {Object} req - Default ExpressJS Api endpoint request object
 * @param {Object} res - Default ExpressJS Api endpoint response object
 * @param {Object} next - Default ExpressJS next hook
 *
 * @returns {Object} error or Api call value
 */
export default (endpoint, data, req, res, next) => {
	return httpFetch({
		endpoint,
		data,
	})
	.then((data) => {
		res.json(data);
		return next();
	})
	.catch((data) => {
		res.json(data);
	})
};
