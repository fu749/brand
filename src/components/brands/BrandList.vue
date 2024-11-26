<template>
  <div>
    <!-- 查询表单 -->
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="当前状态">
        <el-select v-model="searchForm.status" placeholder="当前状态">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业名称">
        <el-input v-model="searchForm.companyName" placeholder="企业名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌名称">
        <el-input v-model="searchForm.brandName" placeholder="品牌名称"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit()">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 操作按钮 -->
    <el-button type="danger" @click="delBatch()" plain>批量删除</el-button>
    <el-button type="primary" @click="dialogVisible = true" plain>新增</el-button>

    <!-- 表格展示品牌信息 -->
    <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        @select="checkSelect"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column align="center" prop="brandName" label="品牌名称"></el-table-column>
      <el-table-column align="center" prop="companyName" label="企业名称"></el-table-column>
      <el-table-column align="center" prop="ordered" label="排序"></el-table-column>
      <el-table-column align="center" prop="statusStr" label="当前状态"></el-table-column>
      <el-table-column align="center" prop="operation" label="操作">
        <el-button type="primary" size="small" @click="updateBrand()">修改</el-button>
        <el-button type="danger" size="small">删除</el-button>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
    ></el-pagination>

    <!-- 编辑品牌对话框 -->
    <el-dialog
        title="编辑品牌"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
    >
      <el-form :model="brandForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="品牌名称" prop="brandName">
          <el-input v-model="brandForm.brandName"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="companyName">
          <el-input v-model="brandForm.companyName"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="brandForm.ordered"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="brandForm.description"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch :active-value="1" :inactive-value="0" v-model="brandForm.status"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('brandForm')">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
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
</script>

<style scoped>
.el-table .even-row {
  background-color: #f9f9f9; /* 偶数行背景色 */
}

.el-table .odd-row {
  background-color: #ffffff; /* 奇数行背景色 */
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 78px;
  height: 78px;
  line-height: 78px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
