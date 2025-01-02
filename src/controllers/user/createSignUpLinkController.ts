import { Request, Response } from 'express';
import { SignUpLinkService } from 'src/services/SignUpLinkService';

export const createSignUpLinkController = async (_: Request, res: Response) => {


  const signUpLinkServiceResponse = await SignUpLinkService.create();

  if (!signUpLinkServiceResponse.success) {
    return res.sendError(signUpLinkServiceResponse);
  }
  return res.sendData(signUpLinkServiceResponse);
};
