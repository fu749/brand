export default {
    data() {
        return {
            checkedBrands: [],
            total: 0,  // 初始化总数据条数
            currentPage: 1,
            pageSize: 5,
            dialogVisible: false,
            isEditMode:true,
            dialogTitle: '编辑品牌',
            tableData: [],  // 表格数据
            value: '',
            text: "商标列表", // 原始文字
            selectedBrands: [],
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
                    {required: true, message: '请输入品牌名称', trigger: 'blur'},
                    {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'},
                ],
                companyName: [{required: true, message: '请输入企业名称', trigger: 'blur'}],
            },

            loading: false, // 添加加载状态
        };
    },
    computed: {
        coloredText() {
            return this.text.split(""); // 将字符串拆分为单字符数组
        },
    },
    methods: {
        // 请求后端数据
        async fetchTableData() {
            this.loading = true; // 开始加载时设置为 true
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
                    const {total, list} = response.data.data;
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
            } finally {
                this.loading = false; // 数据加载完成后设置为 false
            }
        },
        // 处理分页大小变化
        handleSizeChange(val) {
            console.log('分页大小变化:', val);
            this.pageSize = val;
            this.currentPage = 1; // 重置当前页为第一页
            this.fetchTableData();
        },
        addBrand() {
            this.dialogTitle = '新增品牌';
            this.isEditMode = false; // 设置为新增模式
            this.resetBrandForm(); // 重置表单
            this.dialogVisible = true; // 打开新增对话框
        },
        // 处理当前页变化
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.fetchTableData();
        },
        onSubmit() {
            const {companyName, brandName} = this.searchForm;
            this.searchForm.companyName = companyName.trim();
            this.searchForm.brandName = brandName.trim();
            this.currentPage = 1; // 重置为第一页
            this.fetchTableData();
        },
        tableRowClassName({rowIndex}) {
            return rowIndex % 2 === 0 ? 'even-row' : 'odd-row';
        },
        checkSelect(selection) {
            this.selectedBrands = selection;
        },
        async delBatch() {
            if (this.selectedBrands.length === 0) {
                this.$message.warning('请选择要删除的品牌');
                return;
            }

            const idsToDelete = this.selectedBrands.map(item => item.id); // 获取选中的品牌 ID
            try {
                const response = await this.$http.post('http://localhost:8082/webShop/DeleteBatchBrands',
                    idsToDelete,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });


                if (response.data.success) {
                    this.$message.success('批量删除成功');
                    this.fetchTableData(); // 刷新表格数据
                } else {
                    this.$message.error('批量删除失败');
                }
            } catch (error) {
                console.error('批量删除失败:', error);
                this.$message.error('删除失败，请检查网络或联系管理员');
            }
        },

        updateBrand(row) {
            this.dialogTitle = '编辑品牌';
            this.isEditMode = true;
            if (!row) {
                console.error('未接收到行数据！');
                return;
            }
            this.brandForm = {
                id: row.id,
                brandName: row.brand_name,  // 确保字段名称与后端一致
                companyName: row.company_name,
                ordered: row.ordered,
                status: row.status,
                description: row.description,
            };
            this.dialogVisible = true; // 打开编辑对话框
        },
        handleClose() {
            this.$confirm('确定要关闭编辑对话框吗？未保存的修改将会丢失', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                this.dialogVisible = false;
                this.resetBrandForm();
            }).catch(() => {
                // 用户取消关闭，无需操作
            });
        }
        ,
        resetBrandForm() {
            // 重置表单数据
            this.brandForm = {
                id: '',
                brandName: '',
                companyName: '',
                ordered: '',
                status: '',
                description: '',
            };
        },
        submitForm() {
            console.log('当前表单数据:', this.brandForm);

            // 确保 status 不为空，若为空则设置为 0
            if (!this.brandForm.status) {
                this.brandForm.status = 0;
            }

            // 将品牌表单字段转换为后端要求的字段命名
            const formData = {
                id: this.brandForm.id,
                brand_name: this.brandForm.brandName,  // 映射为下划线命名
                company_name: this.brandForm.companyName,  // 映射为下划线命名
                ordered: this.brandForm.ordered,
                status: this.brandForm.status,
                description: this.brandForm.description
            };

            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    try {
                        let response;
                        if (this.isEditMode) {
                            // 如果是编辑模式，发送更新请求
                            response = await this.$http.post('http://localhost:8082/webShop/UpdateBrand', formData);
                        } else {
                            // 如果是新增模式，发送添加请求
                            response = await this.$http.post('http://localhost:8082/webShop/AddBrand', formData);
                        }

                        if (response.data && response.data.success) {
                            this.$message.success(this.isEditMode ? '品牌信息更新成功！' : '品牌添加成功！');

                            // 只有在新增模式下才刷新页面
                            if (!this.isEditMode) {
                                window.location.reload(); // 刷新页面
                            } else {
                                // 编辑模式下，更新表格中的数据
                                const index = this.tableData.findIndex(item => item.id === this.brandForm.id);
                                if (index !== -1) {
                                    this.$set(this.tableData, index, {
                                        ...this.brandForm,
                                        brand_name: this.brandForm.brandName,
                                        company_name: this.brandForm.companyName,
                                        ordered: this.brandForm.ordered,
                                        statusStr: this.brandForm.status === 1 ? '启用' : '禁用',
                                        description: this.brandForm.description
                                    });
                                }
                            }

                            this.dialogVisible = false; // 关闭对话框
                        } else {
                            this.$message.error(response.data.message || (this.isEditMode ? '更新失败' : '添加失败'));
                        }
                    } catch (error) {
                        console.error('操作失败:', error);
                        this.$message.error('操作失败，请检查网络或联系管理员');
                    }
                } else {
                    console.log('表单校验失败');
                }
            });
        },


        async deleteBrand(id) {
            try {
                // 发送删除请求
                const response = await this.$http.get('http://localhost:8082/webShop/DeleteBrand', { params:{id:id }});

                // 检查后端返回的成功字段
                if (response.data && response.data.success) {
                    this.$message.success('品牌删除成功！');  // 显示成功提示
                    this.fetchTableData();  // 删除后刷新表格数据
                } else {
                    // 如果返回失败信息，提示错误
                    this.$message.error(response.data.message || '删除失败');
                }
            } catch (error) {
                // 捕获并处理异常
                console.error('删除操作失败:', error);
                this.$message.error('删除失败，请检查网络或联系管理员');
            }
        },

    },

    mounted() {
        this.fetchTableData(); // 页面加载时请求数据
    },

};
