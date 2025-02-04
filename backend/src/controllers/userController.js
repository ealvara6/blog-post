const hashpassword = require('../utils/hashPassword');
const {
  checkIfUserExists,
  createUserInDatabase,
  findUser,
} = require('../services/userService');

const getUsers = (prisma) => async (req, res) => {
  try {
    let users = await prisma.user.findMany({
      include: { posts: true, comments: true },
    });
    res.status(200).json({
      users,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const getOneUser = (prisma) => async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(404).json({ error: 'Invalid id input' });
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return res.status(404).json({ error: 'No user found' });
    }

    return res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

const createUser = (prisma) => async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await checkIfUserExists(req.body, prisma);
    if (existingUser) {
      const field = existingUser.username === username ? 'username' : 'email';
      return res.status(409).json({
        error: `${field} is already associated with an existing account`,
      });
    }

    const hashedpassword = await hashpassword(password);

    const newUser = await createUserInDatabase(prisma, {
      username,
      email,
      password: hashedpassword,
    });

    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to register user', details: err.message });
  }
};

const updateUser = (prisma) => async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(404).json({ error: 'Invalid id input' });
    const userUpdate = req.body;
    const user = await findUser(prisma, id);
    if (!user) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: userUpdate,
    });

    res.status(200).json({
      message: 'User successfully updated',
      user: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Failed to update user',
      details: err.message,
    });
  }
};

const deleteUser = (prisma) => async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(404).json({ error: 'Invalid id input' });
    const user = await findUser(prisma, id);
    if (!user) return res.status(404).json({ error: 'User does not exist' });

    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    return res
      .status(200)
      .json({ message: 'User successfully deleted', user: deletedUser });
  } catch (err) {
    return res.status(500).json({
      error: 'Failed to delete user',
      details: err.message,
    });
  }
};

module.exports = { getUsers, getOneUser, createUser, updateUser, deleteUser };
