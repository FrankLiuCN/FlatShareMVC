using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlatShareMVC.Models
{
    public class SettlementInfoModel
    {
        public Settlement SettlementInfo { get; set; }
        public List<SettlementLineInfo> SettlementLineInfos { get; set; }
    }

    public partial class SettlementLineInfo
    {

        public Nullable<int> sluaId { get; set; }
        public string uaUserName { get; set; }
        public Nullable<decimal> sActuallyPay { get; set; }
        public Nullable<decimal> sPayable { get; set; }
        public Nullable<decimal> sBalance { get; set; }
        public Nullable<bool> sDeleted { get; set; }
    }
}