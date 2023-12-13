import db from "./db";

const createTRPCContext = () => {
	return {
		db,
	};
};

export default createTRPCContext;
