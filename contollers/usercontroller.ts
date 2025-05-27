import { Request, Response } from 'express';
import User from '../models/user';

// POST /api/login
export const loginUser = async (req: Request, res: Response) => {
  const { phone } = req.body;

  try {
    let user = await User.findOne({ phone });

    if (!user) {
      user = new User({ phone, highScore: 0 });
      await user.save();
      res.json({message : "New user created"})
    }

      if (user) {
        res.json({message : "user exists","user" : user})
      }
      
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// POST /api/update-score
export const updateScore = async (req: Request, res: Response)  => {
  const { phone, score } = req.body;

  try {
    const user = await User.findOne({ phone });

    if (!user){
         res.status(404).json({ message: 'User not found' });
         return
    }

    if (score > user.highScore) {
      user.highScore = score;
      await user.save();
    }

    res.json({ highScore: user.highScore });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// GET /api/high-score/:phone
export const getHighScore = async (req: Request, res: Response) => {
  const { phone } = req.params;

  try {
    const user = await User.findOne({ phone });

    if (!user){
         res.status(404).json({ message: 'User not found' });
         return
    }

    res.json({ highScore: user.highScore });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
