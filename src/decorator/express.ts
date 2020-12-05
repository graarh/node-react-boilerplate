import {Request, Response} from 'express';

export type requestParams = { [name: string]: any };
export type templateRequestParams = {
  route: requestParams, //from route, e.g. /view/:id
  query: requestParams, //from query string, e.g. /view?a=1
  post: requestParams, //from urlencoded body, e.g. a=1&b=2
};
export type templateResponseParams = { template: string, data: any };
export type templateFunc = (params: templateRequestParams) => templateResponseParams;
export type templateValidator = (params: templateRequestParams) => templateRequestParams;

export function handleAsTemplate(args: {
  handler: templateFunc;
  validator?: templateValidator;
  errorTemplate?: string,
}) {
  return (req: Request, res: Response) => {
    let params = {
      route: req.params,
      query: req.query,
      post: req.body,
    };

    if (args.validator) {
      try {
        params = args.validator(params);
      } catch (e) {
        res.status(400).render(args.errorTemplate ?? 'error', e)
        return;
      }
    }

    try {
      const result = args.handler(params)
      res.status(200).render(result.template, result.data);
    } catch (e) {
      res.status(500).render(args.errorTemplate ?? 'error', e);
    }
  }
}

export type apiFunc = (params: requestParams) => any;
export type apiValidator = (params: requestParams) => requestParams;

export function handleAsAPI(args: {
  handler: apiFunc,
  validator?: apiValidator,
}) {

  return (req: Request, res: Response) => {
    let params = req.body;
    const start = Date.now();
    if (args.validator) {
      try {
        params = args.validator(params);
      } catch (e) {
        res.status(400).json({
          success: false,
          error: `invalid parameters (${e.toString()})`,
          executionTime: Date.now() - start,
        });
        return;
      }
    }
    try {
      const result = args.handler(params); //express.json() middleware expected
      res.status(200).json({
        success: true,
        data: result,
        executionTime: Date.now() - start,
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        error: e.toString(),
        executionTime: Date.now() - start,
      });
    }
  }
}