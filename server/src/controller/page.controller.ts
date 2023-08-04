import { Request, Response } from "express";
import pageModel from "../models/page.model";

export const getTest = async (req: Request, res: Response) => {
  try {
    const all = await pageModel.find({}, { _id: 0, __v: 0 });
    res.json(all);
    console.log("all..");
  } catch (error) {
    res.status(400).send({ message: "getPage error" });
  }
};

export const getPages = async (req: Request, res: Response) => {
  try {
    const page: any = req.params.id;
    const skip = page * 1 - 1;
    const pages = await pageModel.find(
      {},
      { __v: 0, _id: 0 },
      { sort: { id: 1 }, skip: skip * 10, limit: 10 }
    );
    res.status(200).json(pages);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const pageAll = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const queryKeys = Object.keys(query);
    let news: any = {};
    let newsort: any = {};
    let limit: any = query.limit;
    let skip: any = query.skip;
    newsort.limit = query.limit ? limit * 1 : 10;
    newsort.skip = query.skip ? skip * 1 : 0;

    for (let i = 0; i < queryKeys.length; i++) {
      if (queryKeys[i] === "mmm") {
        news[`$or`] = [
          { title: { $regex: query[queryKeys[i]], $options: "i" } },
          { body: { $regex: query[queryKeys[i]], $options: "i" } },
        ];
      } else {
        newsort.sort = {};
        newsort.sort[queryKeys[i]] = query[queryKeys[i]];
      }
    }
    const data = await pageModel.find(news, {}, newsort);

    res.status(200).json({ data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
