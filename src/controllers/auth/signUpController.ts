import { Request, Response } from 'express';
import { SignUpPayload } from 'src/@types';
import { SignUpService } from 'src/services/SignUpService';

export async function signUpController(req: Request<{}, {}, SignUpPayload>, res: Response) {
  const signupServiceResponse = await SignUpService.sign(req.body);

  if (!signupServiceResponse.success) {
    return res.sendError(signupServiceResponse.status);
  }

  return res.sendData(signupServiceResponse.data);
}
