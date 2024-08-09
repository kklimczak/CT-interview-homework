const { Router } = require("express");
const { validateDto } = require("../middlewares/validate-dto.middleware");
const { newShipmentSchema } = require("../schemas/shipment.schemas");
const { dataSource } = require("../config/data-source");
const { ProductEntity } = require("../entities/product.entity");
const { In } = require("typeorm");
const { AppError } = require("../middlewares/error-handler.middleware");
const { StatusCodes } = require("http-status-codes");

const shipmentRouter = new Router();

shipmentRouter.post(
  "/",
  validateDto(newShipmentSchema),
  async (req, res, next) => {
    const newShipmentDto = req.body;

    const idsToAdd = newShipmentDto.map((shipment) => shipment.id);

    const productsInShipment = await dataSource
      .getRepository(ProductEntity)
      .findBy({
        id: In(idsToAdd),
      });

    const isEnoughQuantity = productsInShipment.every((product) => {
      const shipment = newShipmentDto.find(
        (shipment) => shipment.id === product.id,
      );
      return product.quantity >= shipment.quantity;
    });

    if (!isEnoughQuantity) {
      return next(
        new AppError(StatusCodes.BAD_REQUEST, "Not enough quantity!"),
      );
    }

    const productsReadyToUpdate = [];

    productsInShipment.forEach((product) => {
      const shipment = newShipmentDto.find(
        (shipment) => shipment.id === product.id,
      );
      if (product.quantity === shipment.quantity) {
        dataSource.getRepository(ProductEntity).remove(product);
      } else {
        product.quantity -= shipment.quantity;
        productsReadyToUpdate.push(product);
      }
    });

    await dataSource.getRepository(ProductEntity).save(productsReadyToUpdate);

    res.sendStatus(StatusCodes.OK);
  },
);

module.exports = { shipmentRouter };
