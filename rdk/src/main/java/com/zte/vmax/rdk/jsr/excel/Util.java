package com.zte.vmax.rdk.jsr.excel;

/**
 * Created by 10033559 on 2017/8/7.
 */
public class Util {

    public static <U,V>  boolean isEquals(U u, V v){
        if(u == null || v == null) return u == v ? true : false;
        return u.equals(v);
    }

    public static <T> int hash(T t){
        return t == null ? 0 : t.hashCode();
    }
}
