import {
	IAction,
	IMiddleware
} from "../interfaces";
import contentTypes from "../middleware/contentTypeMiddleware";

class ContentMiddleware implements IMiddleware {
	create(action: IAction, next: any) {
		next(action);
	}
	readList(action: IAction, next: any) {
		contentTypes.readList(action, next);
	}
}

export default new ContentMiddleware();