import 'reflect-metadata';
import { Resolver, Query, Mutation, Arg, Int } from 'type-graphql';
import { User } from '../Entities/User';

// @InputType()
// class UserInput {
//   @Field()
//   FirstName: string

//   @Field(() => String)
//   LastName: string

//   @Field(() => Int)
//   Age:number

// }

@Resolver()
export class Helloresolver {
  @Query(() => [User]!)
  async hello() {
    const UUser = User.find().then((data) => {
      return data;
    });
    return await UUser;
  }

  @Mutation(() => Boolean)
  async AddUser(
    @Arg('FirstName', () => String) FirstName: string,
    @Arg('LastName', () => String) LastName: string,
    @Arg('Age', () => Int) Age: number
  ) {
    await User.insert({ firstName: FirstName, lastName: LastName, age: Age });
    return true;
  }

  @Mutation(() => Boolean)
  async UpdateUser(
    @Arg('id', () => Int) id: number,
    @Arg('FirstName', () => String) FirstName: string,
    @Arg('LastName', () => String) LastName: string,
    @Arg('Age', () => Int) Age: number
  ) {
    //const user = await User.findOne(id);
    await User.update(id, {
      firstName: FirstName,
      lastName: LastName,
      age: Age,
    });
    return true;
  }

  @Mutation(() => Boolean)
  async DeleteUser(@Arg('id', () => Int) id: number) {
    //const user = await User.findOne(id);
    User.delete(id);
    return true;
  }
}
