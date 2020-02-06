setwd("C:/Users/beckerm/Desktop/TrailCam2017")

library(stringr)

obs<-read.csv("TrailCam_FlowObs2017.csv",header=TRUE,stringsAsFactors = FALSE)
files<-read.csv("imgfiles2017_attributeinfo.csv",header=TRUE,stringsAsFactors=FALSE)
colnames(files)[4]<-"STA_SEQ"

data<-merge(files,obs,by=c("STA_SEQ","Month","Day","Year"))


sdates<-unique(data[c("STA_SEQ","Month","Day","Year")])
sites<-unique(sdates$STA_SEQ)

for (i in 1:length(sites)){
  print(sites[i])
  print(dim(sdates[sdates$STA_SEQ==sites[i],])[1])
}


data<-data[data$time==16,]

data$minute<-as.numeric(str_sub(data$fdatetime,-2,-1))

minTime16<-aggregate(data$minute,by=as.list(data[,c("STA_SEQ","Date")]),FUN=min)
colnames(minTime16)[3]<-"minute"

data<-merge(data,minTime16,by=c("STA_SEQ","Date","minute"))

check<-aggregate(data$minute,by=as.list(data[,c("STA_SEQ","Date")]),FUN=length)
check[check$x>1,]