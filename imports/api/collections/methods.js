import { Meteor } from 'meteor/meteor';

import Product from './product';
import Category from './category';
import Unit from './unit';
import Sale from './sale';
import Amount from './amount';

Meteor.methods({
    checkNameInDb(val) {
        return Product.findOne({ name: val });
    },
    insertPro(data) {
        Meteor._sleepForMs(1000)
        return Product.insert(data);
    },
    insertAmount(data) {
        return Amount.insert(data)
    },
    insertCat(data) {
        return Category.insert(data);
    },
    insertUn(data) {
        return Unit.insert(data);
    },
    insertSl(data) {
        Meteor._sleepForMs(1000);
        return Sale.insert(data);
    },
    removeRow(data) {
        return Sale.remove({ _id: data })
    },
    callAmount() {
        return Amount.find().fetch();
    },
    callCate() {
        return Category.find().fetch();
    },
    callUnit() {
        return Unit.find().fetch();
    },
    callProd() {
        return Product.find().fetch();
    },
    removeAll(data) {
        Meteor._sleepForMs(1000);
        data.forEach((o) => {
            return Sale.remove({ _id: o._id });

        });
    },
    findAllSale() {
        let saleDoc = Sale.aggregate([
            {
                $lookup: {
                    from: "product",
                    localField: "product",
                    foreignField: "_id",
                    as: "productDoc"
                }
            },
            {
                $unwind: { path: "$productDoc", preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: "category",
                    localField: "productDoc.cate",
                    foreignField: "_id",
                    as: "categoryDoc"
                }
            },
            {
                $unwind: { path: "$categoryDoc", preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: "unit",
                    localField: "productDoc.unit",
                    foreignField: "_id",
                    as: "unitDoc"
                }
            },
            {
                $unwind: { path: "$unitDoc", preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: "amount",
                    localField: "productDoc.amount",
                    foreignField: "_id",
                    as: "amountDoc"
                }
            },
            {
                $unwind: { path: "$amountDoc", preserveNullAndEmptyArrays: true }
            },
            {
                $group: {
                    _id: "$_id",
                    productId: { $last: "$productDoc._id" },
                    saledate: { $last: "$productDoc.date" },
                    productDoc: { $last: "$productDoc" },
                    unitDoc: { $last: "$unitDoc" },
                    categoryDoc: { $last: "$categoryDoc" },
                    saleprice: { $last: "$saleprice" },
                    amountDoc: { $last: "$amountDoc" }
                }
            },
        ]);
        return saleDoc;
    },
    selectProd(product_id) {
        return Product.findOne({ _id: product_id });
    },
    findSaleAmount(amount_id) {
        return Amount.findOne({ _id: amount_id });
    },
    findSaleUnit(unit_id) {
        return Unit.findOne({ _id: unit_id })
    },
    findSaleDate(date) {
        return Product.findOne({ _id: date })
    },
})