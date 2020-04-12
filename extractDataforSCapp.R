setwd("/home/mkozlak/Documents/Projects/GitHub/streamConnectViz")

library(stringr)
library(jsonlite)
library(rgdal)
library(lubridate)

obs<-read.csv("data/TrailCam_FlowObs2017.csv",header=TRUE,stringsAsFactors = FALSE)
siteLocation<-read.csv("data/sites.csv",header=TRUE)
colnames(siteLocation)<-c("STA_SEQ","Station_Name","Ylat","Xlong")
obs<-obs[obs$STA_SEQ %in% siteLocation$STA_SEQ,]
obs$Date<-mdy(obs$Date)

#Check to see what dates are missing observations
ndate<-aggregate(obs$STA_SEQ,by=list(obs$Date),FUN=length)
ndate<-ndate[ndate$x<dim(siteLocation)[1],]
dim(ndate)

#########SITES to GeoJSON################################################################
##########################################################################################
imgCat<-obs[,c(1,3,7)]
write.csv(imgCat,"data/imgCat.csv",row.names=FALSE)



coordinates(siteLocation)=c("Xlong","Ylat")
class(siteLocation)
writeOGR(siteLocation,"data/sites.geojson",layer="siteLocation",driver="GeoJSON")

########Identifying one daily image for each observation###################################
##########################################################################################
files<-read.csv("data/imgfiles2017_attributeinfo.csv",header=TRUE,stringsAsFactors=FALSE)
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

# test_data<-data[data$STA_SEQ==16046|data$STA_SEQ==15244|data$STA_SEQ==19657,]
# test_data<-test_data[test_data$Month==8&test_data$Day<15,]
# test_data$relpath<-paste0("image/",test_data$fpath)
# 
# imgPath<- test_data[,c(1,2,22)]
# imgPathJSON<-toJSON(imgPath,pretty=TRUE)
# write_json(imgPathJSON,"data/imgPath.json")
# 
# imgCat<-test_data[,c(1,2,17)]
# write.csv(imgCat,"data/imgCat.csv",row.names=FALSE)

##file.copy(test_data$pathtofile,'P:/Projects/GitHub_Prj/streamConnectViz/images')




