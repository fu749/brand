export default {
    data() {
        return {
            checkedBrands: [],
            total: 0,  // 初始化总数据条数
            currentPage: 1,
            pageSize: 5,
            dialogVisible: false,
            tableData: [],  // 表格数据
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
        // 请求后端数据
        async fetchTableData() {
            try {
                const response = await this.$http.get('http://localhost:8082/webShop/BrandServlet', {
                    params: {
                        page: this.currentPage, // 当前页
                        pageSize: this.pageSize, // 每页条数
                        companyName: this.searchForm.companyName, // 搜索条件
                        brandName: this.searchForm.brandName,
                        status: this.searchForm.status,
                    }
                });

                // 确保后端响应数据格式正确
                if (response.data && response.data.data) {
                    const { total, list } = response.data.data;
                    this.total = total; // 设置总数据条数
                    this.tableData = list.map(item => ({
                        ...item,
                        statusStr: item.status === 1 ? '启用' : '禁用', // 转换状态
                    }));
                    console.log('数据加载成功:', this.tableData);
                } else {
                    console.error('数据格式错误:', response.data);
                    this.tableData = [];
                }
            } catch (error) {
                console.error('数据加载失败:', error);
                this.tableData = [];
            }
        },
        // 处理分页大小变化
        handleSizeChange(val) {
            console.log('分页大小变化:', val);
            this.pageSize = val;
            this.currentPage = 1; // 重置当前页为第一页
            this.fetchTableData();
        },
        // 处理当前页变化
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.fetchTableData();
        },
        submitForm() {
            console.log(JSON.stringify(this.brandForm));
        },
        onSubmit() {
            console.log('搜索条件:', this.searchForm);
            this.fetchTableData(); // 提交搜索条件并重新加载数据
        },
        handleClose() {
            this.dialogVisible = false;
        },
        tableRowClassName({ rowIndex }) {
            return rowIndex % 2 === 0 ? 'even-row' : 'odd-row';
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
    mounted() {
        this.fetchTableData(); // 页面加载时请求数据
    },
};
