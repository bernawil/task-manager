import prisma from '../dbClient.js';
import { getTasks } from '../ext-src/queries.js';
export default async function (args, context) {
    return getTasks(args, Object.assign(Object.assign({}, context), { entities: {
            Task: prisma.task,
        } }));
}
//# sourceMappingURL=getTasks.js.map