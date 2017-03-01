#region Using Directives

using log4net;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

#endregion

namespace ICGROUP.CAMPAIGN_MANAGER.COMMON
{
    public class Log4NetLogger : ILogger
    {
        private const string LOG4NET_CONFIG_FILE = "log4net.config";

        #region Private Variables

        private ILog log;
        private static Dictionary<LoggerType, Log4NetLogger> loggerDictionary = new Dictionary<LoggerType, Log4NetLogger>();

        #endregion

        #region Class Initializer

        /// <summary>
        /// Default constructor
        /// </summary>
        private Log4NetLogger()
        {
            log = LogManager.GetLogger(LoggerType.Info.ToString());
        }

        /// <summary>
        /// Overloaded constructor with logger type parameter
        /// </summary>
        /// <param name="loggerType">logger type</param>
        private Log4NetLogger(LoggerType loggerType)
        {
            log = LogManager.GetLogger(loggerType.ToString());
        }

        /// <summary>
        /// Get logger instance
        /// </summary>
        /// <returns>logger instance</returns>
        public static Log4NetLogger GetInstance()
        {
            if (!loggerDictionary.ContainsKey(LoggerType.Info))
            {
                loggerDictionary.Add(LoggerType.Info, new Log4NetLogger());
            }
            return loggerDictionary[LoggerType.Info];
        }

        /// <summary>
        /// Get logger instance overloaded with logger type
        /// </summary>
        /// <param name="loggerType">logger type</param>
        /// <returns>logger instance</returns>
        public static Log4NetLogger GetInstance(LoggerType loggerType)
        {
            if (!loggerDictionary.ContainsKey(loggerType))
            {
                loggerDictionary.Add(loggerType, new Log4NetLogger(loggerType));
            }
            return loggerDictionary[loggerType];
        }

        #endregion
        public static void Configure()
        {
            FileInfo logConfig = new FileInfo(AppDomain.CurrentDomain.BaseDirectory + LOG4NET_CONFIG_FILE);
            log4net.Config.XmlConfigurator.Configure(logConfig);
        }      

        /// <summary>
        /// Logs messages of type 'DEBUG' to the appenders
        /// </summary>
        /// <param name="message"></param>
        /// <param name="detailMessage"></param>
        /// <param name="source"></param>
        public void LogDebug(string message, string detailMessage, string source)
        {
            try
            {
                if (log.IsDebugEnabled)
                    log.Debug(string.Format(CultureInfo.InvariantCulture, "{0},{1},{2}", message, detailMessage, source));
            }
            catch
            {

            }
        }

        /// <summary>
        /// Logs messages of type 'ERROR' to the appenders
        /// </summary>
        /// <param name="message"></param>
        /// <param name="detailMessage"></param>
        /// <param name="source"></param>
        public void LogError(string message, string detailMessage, string source)
        {
            try
            {
                if (log.IsErrorEnabled)
                    log.Error(string.Format(CultureInfo.InvariantCulture, "{0},{1},{2}", message, detailMessage, source));
            }
            catch
            {

            }
        }

        /// <summary>
        /// Logs messages of type 'INFORMATION' to the appenders
        /// </summary>
        /// <param name="message"></param>
        /// <param name="detailMessage"></param>
        /// <param name="source"></param>
        public void LogInfo(string message, string detailMessage, string source)
        {
            try
            {
                if (log.IsInfoEnabled)
                    log.Info(string.Format(CultureInfo.InvariantCulture, "{0},{1},{2}", message, detailMessage, source));
            }
            catch
            {

            }
        }

        /// <summary>
        /// Logs messages of type 'WARNING' to the appenders
        /// </summary>
        /// <param name="message"></param>
        /// <param name="detailMessage"></param>
        /// <param name="source"></param>
        public void LogWarn(string message, string detailMessage, string source)
        {
            try
            {
                if (log.IsWarnEnabled)
                    log.Warn(string.Format(CultureInfo.InvariantCulture, "{0},{1},{2}", message, detailMessage, source));
            }
            catch
            {

            }
        }

        /// <summary>
        /// Logs messages of type 'FATAL' to the appenders
        /// </summary>
        /// <param name="message"></param>
        /// <param name="detailMessage"></param>
        /// <param name="source"></param>
        public void LogFatal(string message, string detailMessage, string source)
        {
            try
            {
                if (log.IsFatalEnabled)
                    log.Fatal(string.Format(CultureInfo.InvariantCulture, "{0},{1},{2}", message, detailMessage, source));
            }
            catch
            {

            }
        }
    }

    public enum LoggerType
    {
        Info = 1,
        Error = 2,
    }
}
