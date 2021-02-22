---
layout: post
title:  "TypeORM FullText Search"
date:   2021-02-22
excerpt: "An example of fulltext search with TypeORM"
tags: [typescript, typeorm]
---

In this short article, we'll see how to use the builtin full-text search in MySQL and PostgreSQL databases with TypeORM.

If you need to search all values that have a particular word or phrase in a SQL database table with Typeorm, here is a quick example. 

Let's say we have a User entity:

```ts
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    fullName: string;

    @Column("varchar")
    username: string;

    @Column("text")
    description: string;
}
```

This will correspond to a SQL table with the `id`, `fullName`, `username` and `description` columns.

## MySQL FUll-Text Search with MATCH ... AGAINST

If you want to use the MySql fulltext feature, you need to create a fulltext index with `@Index({ fulltext: true })` and use [query builder](http://typeorm.io/#/select-query-builder/adding-where-expression) to build a query with SQL syntax.


First, you need to modify the User entity as follows:

```ts
import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Index({ fulltext: true })
    @Column("varchar")
    fullName: string;

    @Index({ fulltext: true })
    @Column("varchar")
    username: string;

    @Index({ fulltext: true })
    @Column("text")
    description: string;
}
```

Next, you need to use the following query:


```ts
import { getRepository } from "typeorm";
import { User } from "./User";

const searchUsers = (args: any) => {
     const { searchQuery } = args;
     const userRepository = getRepository(User);

     return userRepository.createQueryBuilder().select()
       .where(`MATCH(fullName) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
       .orWhere(`MATCH(username) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
       .orWhere(`MATCH(description) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
       .getMany();
}
```

This will search for the specified search text in the `fullName`, `username` or `description` columns using the `MATCH() ... AGAINST` syntax.

Check out [Full-Text Search Functions](https://dev.mysql.com/doc/refman/8.0/en/fulltext-search.html)

## PostgreSQL FUll-Text Search

For Postgres, you can use the `ILIKE` expression as follows:

```ts
import { getRepository } from "typeorm";
import { User } from "./User";

const searchUsers = (args: any) => {
     const { searchQuery } = args;
     const userRepository = getRepository(User);

     return userRepository.createQueryBuilder().select()
       .where('fullName ILIKE :searchQuery', {searchQuery: `%${searchQuery}%`})
       .orWhere('username ILIKE :searchQuery', {searchQuery: `%${searchQuery}%`})
       .orWhere('description ILIKE :searchQuery', {searchQuery: `%${searchQuery}%`})
       .getMany();
}
```

