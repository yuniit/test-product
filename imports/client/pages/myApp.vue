<template >
    <div>
        <el-row :gutter="20">
            <el-col :span="12" :offset="3">

                <!-- Start product from -->
                <p class="prod-text">Products</p>
                <el-form :model="proForm" :label-position="labelPosition" :rules="proRules" ref="proForm" label-width="110px" class="demo-ruleForm">
                    <el-form-item label="Product Name" prop="name">
                        <el-input type="text" v-model="proForm.name"></el-input>
                    </el-form-item>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="Price" prop="price">
                                <el-input type="text" v-model="proForm.price"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" style="padding:0">
                            <el-form-item label="Amount" prop="amount">
                                <el-select v-model="proForm.amount" clearable placeholder="Select amount">
                                    <el-option v-for="item in amountList" :key="item._id" :label="item.name" :value="item._id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="Category" prop="catId">
                                <el-select v-model="proForm.catId" clearable placeholder="Select a category">
                                    <el-option v-for="item in catList" :key="item._id" :label="item.name" :value="item._id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" style="padding:0">
                            <el-form-item label="Date" prop="dateId">
                                <el-date-picker v-model="proForm.dateId" type="date" placeholder="Pick a day">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="Unit" prop="unitId">
                        <el-select v-model="proForm.unitId" clearable placeholder="Select a unit">
                            <el-option v-for="item in unitList" :key="item._id" :label="item.name" :value="item._id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="insertPro()" v-loading.fullscreen.lock="loadingBody">Submit</el-button>
                        <el-button type="warning" :plain="true" @click="resetPro()" style="float:right">Reset</el-button>
                    </el-form-item>
                </el-form>
            </el-col>

            <!-- Start category form -->
            <el-col :span="12" :offset="5" style="display:none">
                <p style="text-align:center;">Categories</p>
                <el-form :model="catForm" ref="catForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="Name" prop="name">
                        <el-input type="text" v-model="catForm.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="insertCat()">Submit</el-button>
                    </el-form-item>
                </el-form>
            </el-col>

            <!-- Start amount form -->
            <el-col :span="12" :offset="5" style="display:none">
                <p style="text-align:center;">Amount</p>
                <el-form :model="amountForm" ref="amuntForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="Name" prop="name">
                        <el-input type="text" v-model="amountForm.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="insertAmount()">Submit</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <!-- Start unit form -->
            <el-col :span="12" :offset="5" style="display:none">
                <p style="text-align:center;">Units</p>
                <el-form :model="unForm" ref="unForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="Name" prop="name">
                        <el-input type="text" v-model="unForm.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="insertUn()">Submit</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <!-- Start sale form -->
            <el-col :span="12" :offset="3">
                <p class="sale-text">Sale</p>
                <el-form :model="slForm" :label-position="labelPosition" :rules="slRules" ref="slForm" label-width="110px" class="demo-ruleForm">
                    <el-form-item label="Product Name" prop="proId">
                        <el-select v-model="slForm.proId" clearable placeholder="Select sale product" @change="selectProd">
                            <el-option v-for="item in proList" :key="item._id" :label="item.name" :value="item._id"></el-option>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="Sale Date" prop="saleDate">
                                <el-input type="text" v-model="slForm.saleDate" :readonly="readonlySaleForm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Sale Unit" prop="saleUnit">
                                <el-input type="text" v-model="slForm.saleUnit" :readonly="readonlySaleForm"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="Sale Price" prop="salePrice">
                                <el-input type="text" v-model="slForm.salePrice" :readonly="readonlySaleForm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" style="padding: 0;">
                            <el-form-item label="Amount" prop="saleAmount">
                                <el-input type="text" v-model="slForm.saleAmount" :readonly="readonlySaleForm"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary" @click="insertSl()">Submit</el-button>
                        <el-button type="warning" :plain="true" @click="resetSl()" style="float:right">Reset</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

        <!-- Start table report -->
        <el-row :gutter="20" style="margin-bottom:30px;">
            <el-col :span="19" :offset="2">
                <el-table ref="tableRef" :data="saleDoc" border style="width:100%" @selection-change="tableSelect" v-loading.body="loadingTable">
                    <el-table-column fixed type="selection" width="55">
                    </el-table-column>
                    <el-table-column label="Sale Date" prop="saledate" sortable :formatter="dateFormat" width="150">
                    </el-table-column>
                    <el-table-column label="Product Name" sortable prop="productDoc.name" width="150">
                    </el-table-column>
                    <el-table-column label="Category Name" sortable prop="categoryDoc.name" width="160">
                    </el-table-column>
                    <el-table-column label="Unit Name" sortable prop="unitDoc.name" width="138">
                    </el-table-column>
                    <el-table-column label="Product Price" prop="productDoc.price" width="130">
                    </el-table-column>
                    <el-table-column label="Price Amount" prop="amountDoc.name" width="130">
                    </el-table-column>
                    <el-table-column label="Remove" width="99">
                        <template scope="scope">
                            <el-button type="danger" :plain="true" size="small" @click="removeRow(scope.row)">Remove</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="margin-top:20px;display:block;">
                    <el-button type="danger" @click="removeAll()">Remove All Select</el-button>
                </div>
            </el-col>
        </el-row>

    </div>
</template>
<script>

import Product from '../../api/collections/product';
import Category from '../../api/collections/category';
import Unit from '../../api/collections/unit';
import Sale from '../../api/collections/sale';
import Amount from '../../api/collections/amount';

export default {
    name: 'app',
    watch: {
        'proForm.name'(val) {
            if (!!val) {
                this.checkNameInDb();
            }
        },
    },
    data() {
        return {
            labelPosition: 'right',
            readonlySaleForm: true,
            selectTableValue: [],
            amountForProd: [],
            forSaleAmount: [],
            selectSale: [],
            loadingBody: false,
            loadingTable: false,
            saleDoc: [],
            amountList: [],
            catList: [],
            unitList: [],
            proList: [],
            proForm: {
                name: '',
                price: '',
                amount: '',
                catId: '',
                dateId: '',
                unitId: '',
            },
            proRules: {
                name: [
                    { required: true, message: 'Product name is required.', trigger: 'blur' },
                ],
                price: [
                    { required: true, message: 'Product price is required.', trigger: 'blur' }
                ],
                amount: [
                    { required: true, message: 'Product amount is required.' }
                ],
                catId: [
                    { required: true, message: 'Product category is required.' }
                ],
                dateId: [
                    { required: true, message: 'Product date is required.' }
                ],
                unitId: [
                    { required: true, message: 'Product unit is required.' }
                ]
            },
            amountForm: {
                name: ''
            },
            catForm: {
                name: '',
                price: ''
            },
            unForm: {
                name: ''
            },
            slForm: {
                proId: '',
                saleDate: '',
                salePrice: '',
                saleAmount: '',
                saleUnit: ''
            },
            slRules: {
                proId: [
                    { required: true, message: 'Sale product is required', }
                ],
                saleDate: [
                    { required: true, message: 'Sale date is required' }
                ],
                salePrice: [
                    { required: true, message: 'Sale price is required', }
                ],
                saleAmount: [
                    { required: true, message: 'Sale amount is required', }
                ],
                saleUnit: [
                    { required: true, message: 'Sale Unit is required' }
                ]
            }
        }
    },
    methods: {
        colorPick(res) {

        },
        tableSelect(val) {
            let arr = [];
            _.forEach(val, function(o) {
                arr.push({ _id: o._id })
            })
            return this.selectTableValue = arr;
        },
        removeAll() {
            if (this.selectTableValue.length > 0) {
                this.$confirm('All this select will remove from data base, Are you sure ?', 'Warning', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                })
                    .then(() => {
                        this.loadingTable = true;
                        Meteor.call('removeAll', this.selectTableValue, (err, res) => {
                            if (!err) {
                                this.callSaleDoc();
                                this.loadingTable = false;
                                this.$message.success({
                                    message: 'All these remove has been completed .'
                                })
                            }
                        })
                    })
                    .catch(() => {
                        this.$message.warning({
                            message: 'All these remove has been canceled .'
                        })
                    })
            }
            else {
                this.$message.info({
                    message: 'Cannot remove this until you have select first !'
                })
            }
        },
        checkNameInDb: _.debounce(function() {
            const h = this.$createElement;
            Meteor.call('checkNameInDb', this.proForm.name, (err, res) => {
                if (!err) {
                    if (res) {
                        this.$message({
                            message: h('p', null, [
                                h('span', null, 'This name already'),
                                h('span', { style: 'color:#FFA726' }, ' Exist')
                            ])
                            ,
                            type: 'warning'
                        })
                        this.proForm.name = '';
                    }
                }
            });
        }, 1000),
        insertPro() {
            let data = {
                name: this.proForm.name,
                price: this.proForm.price,
                amount: this.proForm.amount,
                cate: this.proForm.catId,
                date: this.proForm.dateId,
                unit: this.proForm.unitId,
            }
            this.$refs.proForm.validate((val) => {
                if (val) {
                    this.loadingBody = true;
                    Meteor.call('insertPro', data, (err, res) => {
                        if (!err) {
                            this.callSaleDoc();
                            this.loadingBody = false;
                            this.$message({
                                type: 'success',
                                message: 'Submit done !'
                            });
                            this.callProd();
                            this.resetPro();
                        }
                    })
                }
                else {
                    setTimeout(() => {
                        this.resetPro();
                    }, 900);
                    this.$message.warning({
                        message: 'You cannot leave this empty !!',
                        duration: 1200
                    })
                }
            });
        },
        insertSl() {
            let data = {
                product: this.slForm.proId,
                saledate: this.slForm.saleDate,
                saleprice: this.slForm.salePrice,
                saleamount: this.slForm.saleAmount,
                saleunit: this.slForm.saleUnit
            }
            this.$refs.slForm.validate((valid) => {
                if (valid) {
                    this.loadingTable = true;
                    Meteor.call('insertSl', data, (err, res) => {
                        if (!err) {
                            this.callSaleDoc();
                            this.loadingTable = false;
                            this.$message({
                                type: 'success',
                                message: 'Submit done !'
                            });
                            this.resetSl();
                        }
                    })
                }
                else {
                    setTimeout(() => {
                        this.resetSl();
                    }, 900);
                    this.$message.warning({
                        message: 'You cannot leave this empty !!',
                        duration: 1200
                    });
                }
            });
        },
        insertAmount() {
            let data = {
                name: this.amountForm.name
            }
            Meteor.call('insertAmount', data, (err, res) => {
                if (!err) {
                    this.callSaleDoc()
                }
            })
        }
        ,
        insertCat() {
            let data = {
                name: this.catForm.name
            }
            Meteor.call('insertCat', data, (err, res) => {
                if (!err) {
                    this.callSaleDoc();
                }
            })
        },
        insertUn() {
            let data = {
                name: this.unForm.name
            }
            Meteor.call('insertUn', data, (err, res) => {
                if (!err) {
                    this.callSaleDoc()
                }
            })
        },
        callAmount() {
            Meteor.call('callAmount', (err, res) => {
                if (!err) {
                    return this.amountList = res;
                }
            })
        },
        callCate() {
            Meteor.call('callCate', (err, res) => {
                if (!err) {
                    return this.catList = res;
                }
            })
        },
        callUnit() {
            Meteor.call('callUnit', (err, res) => {
                if (!err) {
                    return this.unitList = res;
                }
            })
        },
        callProd() {
            Meteor.call('callProd', (err, res) => {
                if (!err) {
                    return this.proList = res;
                }
            })
        },
        callSaleDoc() {
            Meteor.call('findAllSale', (err, res) => {
                if (!err) {
                    return this.saleDoc = res;
                }
            })
        },
        removeRow(data) {
            this.$confirm('This will be remove from data base, Are you sure?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            })
                .then(() => {
                    Meteor.call('removeRow', data._id, (err, res) => {
                        if (!err) {
                            this.callSaleDoc();
                            this.$message({
                                type: 'success',
                                message: 'Remove has been completed .'
                            })
                        }
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'warning',
                        message: 'Remove has been canceled .'
                    })
                })
        },
        selectProd(val) {
            Meteor.call('selectProd', val, (err, res) => {
                if (!err) {
                    this.slForm.salePrice = res.price;
                    this.slForm.saleDate = moment(res.date).format("DD/MM/YYYY");
                    this.findSaleAmount(res.amount);
                    this.findSaleUnit(res.unit);
                }
            })
            if (val.length == 0) {
                this.resetSl();
            }
        },
        findSaleAmount(amount_id) {
            Meteor.call('findSaleAmount', amount_id, (err, res) => {
                if (!err) {
                    if (res) {
                        this.slForm.saleAmount = res.name;
                    }
                }
            })
        },
        findSaleUnit(unit_id) {
            Meteor.call('findSaleUnit', unit_id, (err, res) => {
                if (!err) {
                    if (res) {
                        this.slForm.saleUnit = res.name;
                    }
                }
            })
        },
        resetPro() {
            this.$refs.proForm.resetFields();
        },
        resetSl() {
            this.$refs.slForm.resetFields();
        },
        dateFormat: (row, column) => {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("DD/MM/YYYY");
        },
    },
    created() {
        this.callAmount();
        this.callCate();
        this.callUnit();
        this.callProd();
        this.callSaleDoc();
        this.findSaleAmount();
    }
}
</script>
<style scope="scope">

</style>