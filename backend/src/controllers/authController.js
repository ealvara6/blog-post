const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const verifyLogin = async (req, res) => {
  try {
    prisma = req.prisma;
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Email is incorrect' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Password is incorrect' });
    }

    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'jwt_secrect', {
      expiresIn: '1h',
    });

    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ details: err.message });
  }
};

module.exports = { verifyLogin };
