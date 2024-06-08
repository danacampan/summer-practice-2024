import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
  '/users',
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    if (users) {
      res.send(users);
    } else {
      res.status(404).send('Users not found');
    }
  })
);

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email-ul e deja înregistrat' });
    }

    try {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
      });

      const savedUser = await newUser.save();

      res.send({
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        token: generateToken(savedUser),
      });

      const confirmationToken = jwt.sign(
        { userId: savedUser._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      savedUser.confirmationToken = confirmationToken;
      await savedUser.save();

      const confirmationLink = `${process.env.FRONTEND_URL}/confirm/${confirmationToken}`;

      /* const mailOptions = {
        from: 'artimarket67@gmail.com',
        to: savedUser.email,
        subject: 'Confirmă înregistrarea',
        text: `Dă click pe următorul link pentru a-ți verifica emailul: ${confirmationLink}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).json({
            message: 'Eroare la trimiterea email-ului de confirmare.',
          });
        } else {
          console.log('Email sent: ' + info.response);
          res.status(201).json({
            message: 'Utilizator înregistrat cu succes.',
          });
        }
      });*/
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'Eroare la înregistrarea utilizatorului.' });
    }
  })
);
export default userRouter;
