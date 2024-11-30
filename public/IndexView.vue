<script src="@/views/js/home.js"></script>
<style src="@/views/css/home.css"></style>

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


