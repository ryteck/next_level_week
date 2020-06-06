import {Request, Response} from 'express';
import knex from "../database/connection";

class PointsController {
    async index(request: Request, response: Response) {
        const {city, uf, items} = request.query;

        const parsedItems = String(items).split(',').map(item => item.trim());

        const points = await knex('points')
            .join('point_item', 'points.id', '=', 'point_item.point_id')
            .whereIn('point_item.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return response.json(points);
    };

    async show(request: Request, response: Response) {
        const {id} = request.params;

        const trx = await knex.transaction();

        const point = await trx('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({message: 'Point not found.'})
        }

        const items = await trx('items')
            .join('point_item', 'items.id', '=', 'point_item.item_id')
            .where('point_item.point_id', id);

        trx.commit();

        return response.json({point, items});
    };

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;

        const trx = await knex.transaction();

        const point = {
            image: 'https://1.bp.blogspot.com/-RcPiCqImMSs/Vmnbig2L8eI/AAAAAAAAFA8/j1wbwGa2wIg/s1600/yama104-00m36s.png',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0];

        const pointItens = items.map((item_id: number) => {
            return {
                item_id,
                point_id
            }
        });

        await trx('point_item').insert(pointItens);

        await trx.commit();

        return response.json({
            id: point_id,
            ...point
        });
    };
};

export default PointsController;