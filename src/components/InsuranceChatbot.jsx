import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, Send } from "lucide-react";

export function InsuranceChatbot({ onQuoteComplete }) {
  const [messages, setMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quoteData, setQuoteData] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showOptions, setShowOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(null);
  const messagesEndRef = useRef(null);

  const questions = [
    {
      id: 'start',
      text: "Hi! I'm here to help you get a car insurance quote. Let's start with your car details. What year was your car manufactured?",
      type: 'dropdown',
      field: 'carYear',
      options: Array.from({length: 26}, (_, i) => (2025 - i).toString())
    },
    {
      id: 'carMake',
      text: "Great! What's the make of your car?",
      type: 'dropdown',
      field: 'carMake',
      options: ['Toyota', 'Ford', 'Holden', 'Hyundai', 'Mazda', 'Nissan', 'Volkswagen', 'BMW', 'Mercedes-Benz', 'Audi', 'Honda', 'Subaru', 'Other']
    },
    {
      id: 'carModel',
      text: "What's the model of your car?",
      type: 'input',
      field: 'carModel'
    },
    {
      id: 'bodyType',
      text: "What body type is your car?",
      type: 'options',
      field: 'bodyType',
      options: ['Hatchback', 'Sedan', 'Station Wagon', 'SUV', 'Coupe', 'Convertible', 'Ute']
    },
    {
      id: 'address',
      text: "Now let's talk about where you keep your car. What's the address where your car is usually kept overnight?",
      type: 'input',
      field: 'address'
    },
    {
      id: 'underFinance',
      text: "Is this car currently under finance?",
      type: 'options',
      field: 'underFinance',
      options: ['Yes', 'No']
    },
    {
      id: 'mainPurpose',
      text: "What's the main purpose of the car?",
      type: 'options',
      field: 'mainPurpose',
      options: ['Private use (Personal day-to-day)', 'Business use (Used for business purposes)']
    },
    {
      id: 'businessRegistered',
      text: "Is the car registered under a business name?",
      type: 'options',
      field: 'businessRegistered',
      options: ['Yes', 'No']
    },
    {
      id: 'gender',
      text: "Now for driver details. What's your gender?",
      type: 'options',
      field: 'gender',
      options: ['Male', 'Female', 'Other', 'Prefer not to say']
    },
    {
      id: 'age',
      text: "What's your age?",
      type: 'dropdown',
      field: 'age',
      options: Array.from({length: 84}, (_, i) => (i + 16).toString())
    },
    {
      id: 'licenseAge',
      text: "At what age did you get your driver's license?",
      type: 'dropdown',
      field: 'licenseAge',
      options: Array.from({length: 84}, (_, i) => (i + 16).toString())
    },
    {
      id: 'hasAccidents',
      text: "Have you had any accidents or incidents in the past 5 years?",
      type: 'options',
      field: 'hasAccidents',
      options: ['Yes', 'No']
    },
    {
      id: 'hasAdditionalDrivers',
      text: "Would you like to list any additional drivers?",
      type: 'options',
      field: 'hasAdditionalDrivers',
      options: ['Yes', 'No']
    },
    {
      id: 'coverType',
      text: "Finally, what type of cover would you like?",
      type: 'options',
      field: 'coverType',
      options: ['Comprehensive', 'Third Party Property', 'Third Party Fire & Theft', 'Complete Care']
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Start conversation
    addBotMessage("Hi! I'm your RACV car insurance assistant. I'll help you get a personalized quote in just a few minutes. Ready to get started?");
    setTimeout(() => {
      setShowOptions(['Yes, let\'s start!']);
    }, 1000);
  }, []);

  const addBotMessage = (content) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        content,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const addUserMessage = (content) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }]);
  };

  const handleOptionClick = (option) => {
    addUserMessage(option);
    setShowOptions([]);
    setShowDropdown(null);

    if (option === "Yes, let's start!") {
      setTimeout(() => {
        askQuestion(0);
      }, 500);
      return;
    }

    // Process answer
    const question = questions[currentQuestion];
    let value = option;
    
    if (question) {
      // Convert values based on field type
      if (question.field === 'underFinance' || question.field === 'businessRegistered' || question.field === 'hasAccidents' || question.field === 'hasAdditionalDrivers') {
        value = option === 'Yes';
      } else if (question.field === 'mainPurpose') {
        value = option.includes('Private') ? 'private' : 'business';
      } else if (question.field === 'coverType') {
        const coverTypeMap = {
          'Comprehensive': 'comprehensive',
          'Third Party Property': 'third-party',
          'Third Party Fire & Theft': 'third-party-fire',
          'Complete Care': 'complete-care'
        };
        value = coverTypeMap[option] || option.toLowerCase();
      } else if (question.field === 'age' || question.field === 'licenseAge') {
        value = parseInt(option);
      }

      setQuoteData(prev => ({ ...prev, [question.field]: value }));
    }

    // Move to next question
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        askQuestion(currentQuestion + 1);
      }, 1000);
    } else {
      // Complete the quote
      setTimeout(() => {
        addBotMessage("Perfect! I have all the information I need. Let me generate your personalized quote...");
        setTimeout(() => {
          const updatedData = question ? {...quoteData, [question.field]: value} : quoteData;
          onQuoteComplete(updatedData);
        }, 2000);
      }, 1000);
    }
  };

  const handleInputSubmit = () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    const question = questions[currentQuestion];
    let value = inputValue;
    
    if (question) {
      if (question.field === 'age' || question.field === 'licenseAge') {
        value = parseInt(inputValue);
      }
      setQuoteData(prev => ({ ...prev, [question.field]: value }));
    }

    setInputValue("");
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        askQuestion(currentQuestion + 1);
      }, 1000);
    } else {
      setTimeout(() => {
        addBotMessage("Perfect! I have all the information I need. Let me generate your personalized quote...");
        setTimeout(() => {
          const updatedData = question ? {...quoteData, [question.field]: value} : quoteData;
          onQuoteComplete(updatedData);
        }, 2000);
      }, 1000);
    }
  };

  const handleDropdownSelect = (value) => {
    handleOptionClick(value);
  };

  const askQuestion = (questionIndex) => {
    const question = questions[questionIndex];
    setCurrentQuestion(questionIndex);
    
    addBotMessage(question.text);
    
    setTimeout(() => {
      if (question.type === 'options') {
        setShowOptions(question.options || []);
      } else if (question.type === 'dropdown') {
        setShowDropdown({
          options: question.options || [],
          field: question.field
        });
      }
      // For input type, just show the input field
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-primary/80">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-foreground mb-2">RACV Car Insurance</h1>
          <p className="text-primary-foreground/80 text-lg">Your friendly insurance assistant</p>
        </div>

        <Card className="max-w-2xl mx-auto h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center gap-3 p-4 border-b bg-muted/30">
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">RACV Assistant</h3>
              <p className="text-sm text-muted-foreground">Online now</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'bot' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-60">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {message.type === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-accent text-accent-foreground">
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-muted/10">
            {showOptions.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {showOptions.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleOptionClick(option)}
                    className="text-sm"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {showDropdown && (
              <div className="mb-3">
                <Select onValueChange={handleDropdownSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option..." />
                  </SelectTrigger>
                  <SelectContent>
                    {showDropdown.options.map((option, index) => (
                      <SelectItem key={index} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {!showOptions.length && !showDropdown && currentQuestion >= 0 && (
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your answer..."
                  onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
                  className="flex-1"
                />
                <Button onClick={handleInputSubmit} size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}