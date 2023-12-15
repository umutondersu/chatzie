import db from "./db";

const createTRPCContext = ({ req }: { req?: Request } = {}) => {
	return {
		headers: req?.headers!,
		db,
	};
};

export default createTRPCContext;
