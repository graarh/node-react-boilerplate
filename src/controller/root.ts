import {Request, Response} from 'express';

export class RootController {
  private value = 123;

  public handleTemplate() {
    return (req: Request, res: Response) => {
      res.render('template', {data: {value: this.value}});
    }
  }
}