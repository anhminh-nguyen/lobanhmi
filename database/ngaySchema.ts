import mongoose from 'mongoose';
import {models, model, Schema} from 'mongoose'; 



const NgaySchema = new mongoose.Schema({
    totalPrice: {type:Number, require: true},
    today: String,
    month: String,
    year: String

});

const Ngay = mongoose.models.Ngay || mongoose.model('Ngay',NgaySchema);

export default Ngay


