<template>
  <div class="footer">
    <div class="links">
      <!-- <a
        href="https://www.keephealthing.cn"
        target="_blank"
      >健康护航首页</a>
      <a
        href="https://www.keephealthing.cn"
        target="_blank"
      >健康护航首页</a>
       <a
        href="https://www.keephealthing.cn"
        target="_blank"
      >健康护航首页</a>-->
    </div>
    <div class="copyright">
      Copyright
      <!-- <a-icon type="copyright" /> 2019-- <span></span> <span>  移动健康管理系统教育部工程研究中心 &cup; 健康未来</span> -->
      <a-icon type="copyright" />2019--
      <span></span>
      <span>{{ $t('footer.name') }} &cup; {{ $t('footer.subName') }}</span>
    </div>
  </div>
</template>

<script>
// 全局的footer
export default {
  name: 'GlobalFooter',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  margin: 36px 0 24px;
  text-align: center;

  .links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
