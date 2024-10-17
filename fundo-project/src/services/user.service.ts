import User from '../models/user.model';   // Make sure the User model is correctly imported
import { IUser } from '../interfaces/user.interface';

class UserService {

  // Get all users
  public getAllUsers = async (): Promise<IUser[]> => {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  };

  // Create new user
  public newUser = async (body: IUser): Promise<IUser> => {
    try {
      const user = await User.create(body);
      return user;
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  };

  // Update a user
  public updateUser = async (_id: string, body: Partial<IUser>): Promise<IUser | null> => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        body,
        { new: true }  // `new: true` ensures the updated document is returned
      );
      
      if (!updatedUser) {
        throw new Error('User not found');
      }

      return updatedUser;
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  };

  // Delete a user
  public deleteUser = async (_id: string): Promise<string> => {
    try {
      const deletedUser = await User.findByIdAndDelete(_id);

      if (!deletedUser) {
        throw new Error('User not found');
      }

      return 'User deleted successfully';
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  };

  // Get a single user
  public getUser = async (_id: string): Promise<IUser | null> => {
    try {
      const user = await User.findById(_id);
      
      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw new Error('Error fetching user: ' + error.message);
    }
  };
}

export default UserService;
