import {
	IAction,
	IMiddleware
} from "../interfaces";

class ContentMiddleware implements IMiddleware {
	read(action: IAction, next: any) {
		next(action);
	}
}

export default new ContentMiddleware();