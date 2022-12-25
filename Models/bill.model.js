const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const billSchema = new Schema(
	{
        iduser: String,
        idproducts: [],
		payment: {
			id: Number,
			name: String
		},
		totalprice: Number,
		discount: Number,
		money: Number,
		check: {
			type: Number,
			default: 0,
		},
		checkstatus: {
			type: String,
			default: "Chờ xác nhận",
		}
	},
	{
		timestamps: true,
	}
);
billSchema.plugin(mongoosePaginate);
const Bill = mongoose.models.Bills || mongoose.model("Bills", billSchema);
module.exports = Bill;