import { NextApiRequest, NextApiResponse } from "next";
import { NewsItem, NewsItemProps } from "../../../components/News/NewsItem";

const getNews = (_req: NextApiRequest, res: NextApiResponse<NewsItemProps[]>) => {
    res.status(200).json(
        [
            {
                header: "Внимание",
                from: "Директор какого-нибудь института",
                date: "Вторник 19:13:271",
                message: "спасибо зв внимание"
            },
            {
                header: "Внимание",
                from: "Директор какого-нибудь института",
                date: "Вторник 19:13:27",
                message: "спасибо зв внимание"
            },
            {
                header: "Внимание",
                from: "Директор какого-нибудь института",
                date: "Вторник 19:13:27",
                message: "спасибо зв внимание"
            },
            {
                header: "Внимание",
                from: "Директор какого-нибудь института",
                date: "Вторник 19:13:272",
                message: "спасибо зв внимание"
            },
            {
                header: "Внимание",
                from: "Директор какого-нибудь института",
                date: "Вторник 19:13:27",
                message: "спасибо зв внимание"
            },
            {
                header: "Внимание",
                from: "Директор какого-нибудь института",
                date: "Вторник 19:13:27",
                message: "спасибо зв внимание"
            },
            {
                header: "Внимание",
                from: "Директор какого-нибудь института",
                date: "Вторник 19:13:27",
                message: "спасибо зв внимание"
            },
            {
                header: "Внимание",
                from: "Директор какого-нибудь института",
                date: "Вторник 19:13:27",
                message: "спасибо зв внимание"
            },
        ]
    )
}

export default getNews