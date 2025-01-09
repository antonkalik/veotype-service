import { Request, Response } from 'express';
import { SignUpLinkService } from 'src/services/SignUpLinkService';
import { TokenService } from 'src/services/TokenService';
import { SignUpService } from 'src/services/SignUpService';
import { SignUpPayload } from 'src/@types';

export const signUpTokenController = async (
  req: Request<
    {
      token: string;
    },
    {},
    SignUpPayload
  >,
  res: Response
) => {
  if (!req.params.token) {
    return res.sendStatus(400);
  }

  try {
    const tokenServiceResponse = await TokenService.verify<{ id: number; uuid: string }>(
      req.params.token
    );

    if (!tokenServiceResponse.success) {
      return res.sendStatus(400);
    }

    const decoded = tokenServiceResponse.data;
    const signUpLinkServiceResponse = await SignUpLinkService.get(decoded.id);

    if (!signUpLinkServiceResponse.success) {
      return res.sendStatus(400);
    }

    if (decoded.uuid !== signUpLinkServiceResponse.data) {
      return res.sendStatus(400);
    }

    const signUpServiceResponse = await SignUpService.sign(req.body);

    if (!signUpServiceResponse.success) {
      return res.sendError(signUpServiceResponse.status);
    }

    return res.sendData(signUpServiceResponse);
  } catch (error) {
    return res.sendStatus(500);
  }
};
