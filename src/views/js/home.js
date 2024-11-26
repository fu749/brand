
export default {
    data() {
        return {
            checkedBrands: [],
            total: 400,
            currentPage: 1,
            pageSize: 5,
            dialogVisible: false,
            tableData: [
                {
                    id: 1,
                    brandName: '小米',
                    companyName: '小米科技有限公司',
                    ordered: 10,
                    status: 1,
                    statusStr: '启用',
                    description: '小米',
                },
                {
                    id: 2,
                    brandName: '华为',
                    companyName: '华为技术有限公司',
                    ordered: 5,
                    status: 1,
                    statusStr: '启用',
                    description: '华为',
                },
                // 你可以继续添加数据
            ],
            value: '',
            searchForm: {
                companyName: '',
                brandName: '',
                status: '',
            },
            brandForm: {
                id: '',
                brandName: '',
                companyName: '',
                ordered: '',
                status: '',
                description: '',
            },
            rules: {
                brandName: [
                    { required: true, message: '请输入品牌名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
                ],
                companyName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
            },
        };
    },
    methods: {
        handleSizeChange(val) {
            console.log(val);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        submitForm() {
            console.log(JSON.stringify(this.brandForm));
        },
        onSubmit() {
            console.log(this.searchForm);
        },
        handleClose() {
            this.dialogVisible = false;
        },
        tableRowClassName({ rowIndex }) {
            // 根据行的索引来判断是否是奇数行或偶数行，从而实现隔行变色
            if (rowIndex % 2 === 0) {
                return 'even-row'; // 偶数行
            }
            return 'odd-row'; // 奇数行
        },
        delBatch() {
            console.log('批量删除');
        },
        checkSelect(data) {
            console.log(`选中项数据：${data}`);
        },
        updateBrand() {
            this.dialogVisible = true;
        },
    },
};
