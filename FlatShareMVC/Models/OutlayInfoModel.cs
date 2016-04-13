using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlatShareMVC.Models
{
    public class OutlayInfoModel
    {
        public Outlay OutlayInfo { get; set; }
        public List<OutlayLine> OutlayLines { get; set; }
    }
}