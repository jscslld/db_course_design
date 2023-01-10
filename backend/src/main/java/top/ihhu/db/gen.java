package top.ihhu.db;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.TemplateType;
import com.baomidou.mybatisplus.generator.fill.Column;

public class gen {
    public static void main(String[] args){
        FastAutoGenerator.create("jdbc:mysql://81.68.155.115:3307/db_design?useUnicode=true&characterEncoding=UTF-8", "root", "Esta2022")
                .globalConfig(builder -> {
                    builder
                            .enableSwagger()
                            //.fileOverride() // 覆盖已生成文件
                            .outputDir("F:\\db_Design\\backend\\db\\src\\main\\java").disableOpenDir()	; // 指定输出目录
                })
                .packageConfig(builder -> {
                    builder.parent("top.ihhu.db");// 设置父包名
                    //.pathInfo(Collections.singletonMap(OutputFile.mapperXml, "F:\\服务外包\\backend\\iExam\\iExam-app\\src\\main\\resources\\mapper")); // 设置mapperXml生成路径
                })
                .strategyConfig(builder -> {
                    builder.addInclude("view_band_fan_count_for_fan").addInclude("view_album_fan_count_for_fan").addInclude("view_song_fan_count_for_fan").addInclude("view_concert_participate_count_for_fan")
                            .entityBuilder()
                            .enableChainModel()
                            .enableLombok()
                            .mapperBuilder()
                            .enableBaseColumnList().enableBaseResultMap().enableMapperAnnotation()
                    //.addIgnoreColumns("created_at","created_by","updated_at","tenant_id","updated_by","version","del_flag")
                    ;
                })
                .templateConfig(builder -> {
                    builder.disable(TemplateType.CONTROLLER);
                })
                .execute();
    }
}
