export class CreateProfileDTO {
  firstName: string;
  lastName: string;
  email: string;
  hiredAt: string;
  passport: Express.Multer.File;
  resume: Express.Multer.File;
  employmentContract: Express.Multer.File;
}
