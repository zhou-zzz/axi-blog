---
title: 辞职总结：从零基础到React Native开发的4个月历程
description: 记录在新公司4个月的React Native学习历程，从零基础到独立开发破易云App的技术挑战与成长感悟
date: 2025-09-18
tags: [React Native, 辞职感悟, 移动端开发]
category: 'blog'
---

# 前言

入职 4 个月后，因团队整体搬迁到成都，我选择了拿赔偿辞职。虽然时间不长，但这段经历让我从零基础快速入门 React Native，并负责了实际 App 的开发与业务迁移，收获颇多。

**核心收获**：从 Web 前端到移动端开发的技术迁移，不仅是技术栈的扩展，更是思维模式的转变。

## 入职背景与挑战

**背景**：此前一直做 Web 前端，这次需要上手移动端开发。

**项目**：破易云 App —— 一个破产案件管理系统，需要把 Web、小程序的业务逻辑迁移到 App 端。

**负责业务模块**：
- **案件管理**：案件创建、编辑
- **债权管理**：债权申报、审核、统计分析
- **个人中心**：用户信息管理、权限设置、操作记录
- **通知送达**：智能电话外呼、短信发送等多渠道送达

**挑战**：完全陌生的技术栈 + 短时间内要落地核心功能。

> **时间压力**：4个月内从零基础到开发完整App核心业务，这对任何开发者都是不小的挑战。

## 技术学习与成长

> **学习路径**：从基础认知到实际应用，每个阶段都有明确的目标和产出。

### 阶段 1：基础认知

- 理解 React Native 与 Web 的差异
- 屏幕适配、手势、原生模块

### 阶段 2：环境搭建

- iOS / Android 开发环境配置
- 真机调试与 Metro 打包

### 阶段 3：核心技术实践

- **导航系统**：React Navigation 7.x（Tab、Stack、Drawer）
- **状态管理**：Zustand + Immer
- **UI**：NativeWind + 企业级组件库
- **网络与数据**：Axios 封装、弱网优化
- **文件与媒体**：文件上传、预览、图片优化

### 阶段 4：业务功能迁移

> **核心挑战**：将复杂的Web端业务逻辑完整迁移到移动端，保持功能完整性的同时优化移动端体验。

#### 个人中心模块迁移
- **头像上传功能**：集成移动端图片选择、裁剪、压缩完整流程
- **实名认证流程**：多步骤认证向导

#### 案件管理核心功能
- **案件列表优化**：从传统分页改为无限滚动，提升移动端体验
- **复杂表单处理**：案件创建和编辑的多步骤表单向导
- **权限控制系统**：细粒度的功能权限和数据权限控制

#### 债权管理业务迁移
- **债权申报流程**：多步骤表单，支持附件上传和实时验证
- **批量操作功能**：债权审核、状态变更的批量处理
- **统计报表**：债权数据的图表化展示和导出功能
- **实质审查**：复杂的审查流程和审查意见管理

#### 通知送达系统集成
- **多渠道通知**：短信、电话、邮件、微信、系统推送的统一管理
- **批量发送优化**：大批量通知的分批发送和状态跟踪
- **模板管理**：通知内容的模板化和个性化定制
- **送达统计**：发送成功率、到达率等关键指标监控

## 核心模块技术实现

> **架构设计**：基于业务领域的模块化设计，每个模块都有独立的状态管理和路由架构。

### 1. 个人中心模块

**路由管理**：使用 React Navigation 的 Stack Navigator 进行页面导航

**状态管理**：
- 使用 `useUserDetail` 自定义 Hook 管理用户信息
- 结合 `useRequest` (ahooks) 进行数据获取和状态管理

**核心功能**：
- **头像上传与裁剪**：集成图片选择、裁剪、压缩功能
- **实名认证状态管理**：多步骤认证流程控制
- **身份选择器组件**：支持多种身份类型切换
- **密码修改功能**：安全的密码更新流程

**UI组件**：抽屉式侧边栏导航，支持退出登录等操作

### 2. 案件模块

**路由架构**：
- 复杂的嵌套路由结构，包含20+个子页面
- 权限控制路由，基于 `ApplicationPermission` 和 `CaseAuthEnum`

```javascript
// 案件路由配置
function CaseStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CaseList"
        component={CaseListScreen}
        options={{ title: '案件列表' }}
      />
      <Stack.Screen
        name="CaseDetail"
        component={CaseDetailScreen}
        options={({ route }) => ({
          title: route.params?.caseName || '案件详情'
        })}
      />
      {/* 20+ 其他子页面路由 */}
    </Stack.Navigator>
  )
}
```

**状态管理**：
- 使用 Zustand 的 `useCaseStore` 管理案件权限和基本信息
- 自定义 Hook `useCaseManagers` 管理案件成员

```javascript
// 案件状态管理
const useCaseStore = create((set, get) => ({
  currentCase: null,
  casePermissions: [],
  caseManagers: [],

  setCurrentCase: caseInfo => set({ currentCase: caseInfo }),

  updateCasePermissions: permissions => set({ casePermissions: permissions }),

  checkPermission: (permission) => {
    const { casePermissions } = get()
    return casePermissions.includes(permission)
  }
}))
```

**核心特性**：
- **案件列表的无限滚动加载** (`InfiniteFlatList`)
- **多状态筛选**（全部、在办、结案、归档）
- **搜索功能**支持案件名/文书号/法院搜索

### 3. 案件详情模块

**组件架构**：
- 使用 `CustomTabbarLayout` 实现多Tab页面布局
- 权限组件 `WithPermission` 控制功能访问

```javascript
// 权限控制高阶组件
function WithPermission({ permission, children, fallback = null }) {
  const hasPermission = useCaseStore(state => state.checkPermission(permission))

  if (!hasPermission) {
    return fallback
  }

  return children
}

// 使用示例
<WithPermission permission={CaseAuthEnum.DEBT_MANAGE}>
  <DebtManagementTab />
</WithPermission>
```

**子模块技术栈**：
- **债权管理**：复杂的表单处理、多选操作、实质审查流程
- **任务进度**：任务详情管理、计时功能、附件上传
- **破产会议**：会议管理和参会人员管理
- **文件公告**：文件上传下载、文件夹管理
- **案件大数据**：数据可视化、图表展示

### 4. 通知送达模块

**多渠道通知架构**：
- 短信通知、智能外呼、邮件通知、系统消息、微信通知
- 统一的通知接口设计和状态管理

```javascript
// 通知服务统一接口
class NotificationService {
  async sendNotification(config) {
    const { channels, recipients, content, template } = config
    const results = []

    for (const channel of channels) {
      try {
        let result
        switch (channel) {
          case 'sms':
            result = await this.sendSMS(recipients, content)
            break
          case 'voice':
            result = await this.makeVoiceCall(recipients, content)
            break
          case 'email':
            result = await this.sendEmail(recipients, content)
            break
          case 'wechat':
            result = await this.sendWechatMessage(recipients, content)
            break
          case 'push':
            result = await this.sendPushNotification(recipients, content)
            break
        }

        results.push({
          channel,
          success: true,
          data: result,
          timestamp: new Date()
        })
      }
      catch (error) {
        results.push({
          channel,
          success: false,
          error: error.message,
          timestamp: new Date()
        })
      }
    }

    return results
  }
}
```

**状态管理**：
- 使用 Zustand 的 `useNotificationTargetStore` 管理通知目标
- 跨页面数据共享和缓存机制

```javascript
// 通知目标状态管理
const useNotificationTargetStore = create((set, get) => ({
  selectedTargets: [],
  notificationHistory: [],

  addTarget: target => set(state => ({
    selectedTargets: [...state.selectedTargets, target]
  })),

  removeTarget: targetId => set(state => ({
    selectedTargets: state.selectedTargets.filter(t => t.id !== targetId)
  })),

  clearTargets: () => set({ selectedTargets: [] }),

  addToHistory: notification => set(state => ({
    notificationHistory: [notification, ...state.notificationHistory]
  }))
}))
```

**核心功能**：
- **批量通知发送**：支持多目标、多渠道批量发送
- **通知状态追踪和统计**：实时状态更新和发送统计
- **模板化通知内容**：预设模板和自定义内容
- **定时发送功能**：支持延时和定时发送

**业务集成**：
- 与案件、会议模块深度集成
- 支持从债权人列表直接发起通知

## 技术特色亮点

### 1. 权限控制体系

- 基于枚举的权限管理 (`CaseAuthEnum`, `ApplicationPermission`)
- 组件级权限控制，细粒度功能访问控制
- 动态权限获取和验证机制

### 2. 状态管理策略

- **Zustand**：轻量级全局状态管理
- **ahooks**：数据获取和副作用管理
- **自定义Hooks**：业务逻辑封装和复用

### 3. 数据处理优化

- 无限滚动列表优化大数据量展示
- 并行API请求提升加载性能
- 本地缓存和状态同步机制
- 防抖搜索和实时筛选

### 4. 组件设计模式

- **复合组件模式**：`CustomTabbarLayout` 等布局组件
- **高阶组件**：`WithPermission` 权限控制
- **Render Props**：灵活的组件渲染模式
- **自定义Hooks**：逻辑复用和状态管理

### 5. 业务流程管理

- 复杂的审批流程状态机
- 多步骤表单向导
- 文件上传和附件管理
- 实时通知和消息推送

### 6. 性能优化实践

- 组件懒加载和代码分割
- 列表虚拟化处理大数据
- 图片懒加载和缓存策略
- 防抖节流优化用户交互

## 收获与成长

> 🚀 **成长总结**：4个月的时间，不仅掌握了新技术栈，更重要的是培养了快速学习和解决问题的能力。

### 技术层面

- ✅ **React Native 核心开发能力**：从零基础到熟练掌握移动端开发流程
- ✅ **状态管理最佳实践**：Zustand + ahooks + 自定义Hooks的组合应用
- ✅ **复杂导航架构设计**：多层级嵌套路由和权限控制的实现
- ✅ **性能优化实践经验**：
  - 无限滚动列表优化大数据量展示
  - 并行API请求和数据缓存策略
  - 组件懒加载和代码分割
  - 图片懒加载和压缩优化
- ✅ **企业级组件库应用**：NativeWind + 自定义组件的设计模式
- ✅ **多渠道通知系统**：短信、电话、推送等统一接口设计
- ✅ **权限控制体系**：基于枚举的细粒度权限管理
- ✅ **跨平台兼容性处理**：iOS/Android平台差异化适配

### 架构思维

- **模块化拆分**：根据业务领域进行清晰的模块划分
  - **案件模块**：案件创建、编辑、状态管理、流程跟踪
  - **债权模块**：债权申报、审核、变更、统计报表
  - **个人中心模块**：用户管理、权限控制、操作日志
  - **通知送达模块**：多渠道通知（短信、电话、推送）、送达记录
  - **文档模块**：文件上传、预览、版本管理
  - **会议模块**：会议安排、参会管理、会议纪要
  - **审批模块**：审批流程、权限控制、状态跟踪
- **多环境配置管理**：开发、测试、生产环境的统一管理

### 职业反思

- **技术迁移带来快速成长**：从舒适圈跳出，挑战新领域
- **认识到学习能力比具体技术更重要**：技术会过时，但学习能力是永恒的
- **开始思考技术深度与广度的平衡**：既要有专精，也要有广度

> **深度思考**：这次经历让我明白，真正的技术成长不在于掌握了多少工具，而在于能否快速适应变化，解决实际问题。

## 总结

虽然因为地理因素选择了离职，但这4个月的经历是宝贵的。从零基础到独立开发App，不仅是技术能力的提升，更是职业素养的锻炼。

**关键收获**：
1. **快速学习能力**：在压力下快速掌握新技术栈
2. **问题解决思维**：从技术角度分析和解决业务问题
3. **架构设计经验**：企业级应用的模块化设计思路

> **未来规划**：继续深耕前端技术，同时保持对新技术的敏感度，做一个既有深度又有广度的全栈开发者。
