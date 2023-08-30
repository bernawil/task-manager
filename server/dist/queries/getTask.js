import prisma from '../dbClient.js';
import { getTask } from '../ext-src/queries.js';
export default async function (args, context) {
    return getTask(args, Object.assign(Object.assign({}, context), { entities: {
            Task: prisma.task,
        } }));
}
//# sourceMappingURL=getTask.js.map