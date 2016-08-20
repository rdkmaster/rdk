package com.zte.vmax.rdk.proxy

import com.zte.vmax.rdk.db.{DeprecatedDataBaseHelper, DataBaseHelper}
import com.zte.vmax.rdk.mq.MqHelper

/**
  * Created by 10054860 on 2016/8/19.
  */
object ProxyManager {

  var dbAccess: Option[DBAccessTrait] = Some(DataBaseHelper)
  var mqAccess: Option[ActiveMQTrait] = Some(MqHelper)

  var deprecatedDbAccess: () => DeprecatedDBAccessTrait = () => new DeprecatedDataBaseHelper

}
