import { z, RouterContext, oak_helpers } from '../../deps.ts'
import { urlSearchParamsToBody } from "../utils/formDataReader.ts"
 
import type { FormFieldsObject} from "../utils/formDataReader.ts"

const validate = (schema: z.AnyZodObject) => {

    return async (ctx: RouterContext<string>, next: () => any): Promise<void> => {
        
        try {

            const contentType  = ctx.request.headers.get('content-type')
            const isTxt = contentType?.indexOf('text')!= -1

            const reqBody  = await ctx.request.body({type: isTxt ? 'text' : 'form'}).value
            
            const objBody = isTxt ? JSON.parse(reqBody) : urlSearchParamsToBody<FormFieldsObject>(reqBody)

             schema.parse({
                params: ctx.params,
                query: oak_helpers.getQuery(ctx),
                body: objBody,
            })

            await next()

        } catch (err: any) {

            if (err instanceof z.ZodError) {

                ctx.response.status = 400;
                ctx.response.body = {
                    status: 'fail',
                    error: err.errors,
                };
                return
            }

            await next()
        }
    }
}

export default validate