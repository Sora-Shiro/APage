## 0xff 更新
- v1.0.2  增加长按回调事件

## 0x00 前言
好久不见，先扔个地址 w ：[Github - ChinaMapInfoView](https://github.com/Sora-Shiro/ChinaMapInfoView)

这是一个可移动、缩放的中国地图，开发者可以使用它来直观显示基于省的统计数据，如各省某年人口出生率、各省每月最高气温等。
实现了省份点击 / 长按事件回调的接口，可以用来跳转到显示该省详细数据的 Activity。
使用 [SVG-Android](https://github.com/MegatronKing/SVG-Android/blob/master/README.zh-cn.md) 开源库生成对应的 Drawable ， 支持 API 14（Android 4.0）+ 版本。

欢迎 Star :)

## 0x01 预览和说明
#### 效果预览（放缩的时候要两个手指，蓝框 A 是模拟器的虚拟按键，模拟其中一个手指）：
![preview.gif](http://upload-images.jianshu.io/upload_images/2948986-d1d381446412b3e7.gif?imageMogr2/auto-orient/strip)


#### 支持特性：
- 平移
- 缩放
- 高亮选中省份
- 当图片过度移动则回滚
- 实现 ChinaMapViewProvinceListener 接口来进行回调交互（点击 / 长按）
- 自定义填充 / 点击 / 长按（边界）颜色、边界宽度

## 0x02 下载

#### Maven

```
<dependency>
  <groupId>com.sorashiro.ChinaMapInfoView</groupId>
  <artifactId>library</artifactId>
  <version>1.0.2</version>
  <type>pom</type>
</dependency>
```

#### Gradle

```
compile 'com.sorashiro.ChinaMapInfoView:library:1.0.2'
```

## 0x03 如何使用

#### `activity_main.xml`

```xml
<com.sorashiro.chinamapinfoview.ChinaMapInfoView
    android:id="@+id/imgCnMap"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
/>
```

#### `MainActivity.java` (使用了 [Butter Knife](https://github.com/JakeWharton/butterknife))

```java
public class MainActivity extends AppCompatActivity implements ChinaMapInfoView.ChinaMapViewProvinceListener {

    @BindView(R2.id.imgCnMap)
    ChinaMapInfoView imgCnMap;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ButterKnife.bind(this);

        initView();
    }

    private void initView() {
        imgCnMap.setChinaMapViewProvinceListener(this);
    }

    @Override
    public void onProvinceClick(int i) {
        LogAndToastUtil.ToastOut(this, imgCnMap.getCnMap().PROVINCE[i] + " is clicked");
    }

    @Override
    public void onProvinceLongClick(int i) {
        LogAndToastUtil.ToastOut(this, imgCnMap.getCnMap().PROVINCE[i] + " is long clicked");
    }
}
```

## 0x04 自定义

如果你想同时改变安徽省的 `填充颜色` 和 `高亮颜色` ，只要这么做：

```java
// first get the config map
// 首先获取总设置 map
CnMap cnMap = imgCnMap.getCnMap();
HashMap<String, CnMapConfig> cnConfigMap = cnMap.configMap;
// or configMap.get("Anhui"); but use cnMap.PROVINCE[0] better
// 或者 configMap.get("Anhui"); 但是用 cnMap.PROVINCE[0] 更好些
CnMapConfig configAnhui = cnConfigMap.get(cnMap.PROVINCE[0]);
// support method chaining
// 支持链式调用（方法链）
configAnhui
        .setFillColor(Color.parseColor("#ee0000"))
        .setClickColor(Color.parseColor("#99ffff"));
```

更多见 [Github](https://github.com/Sora-Shiro/ChinaMapInfoView) :) 
感谢支持 w